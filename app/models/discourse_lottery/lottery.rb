module DiscourseLottery
  class Lottery < ActiveRecord::Base
    self.table_name = "discourse_lotteries"

    enum draw_mode: { auto: 0, manual: 1 }
    enum status: { scheduled: 0, running: 1, drawn: 2, closed: 3, deleted: 4 }

    belongs_to :topic, optional: true
    belongs_to :created_by, class_name: "User"

    has_many :prizes, class_name: "DiscourseLottery::Prize", foreign_key: :lottery_id, dependent: :destroy
    has_many :entries, class_name: "DiscourseLottery::Entry", foreign_key: :lottery_id, dependent: :destroy
    has_many :winners, class_name: "DiscourseLottery::Winner", foreign_key: :lottery_id, dependent: :destroy

    validates :title, presence: true, length: { maximum: 255 }
    validates :description_raw, presence: true
    validates :starts_at, presence: true
    validates :ends_at, presence: true
    validates :created_by_id, presence: true

    validate :validate_times
    validate :validate_draw_at

    before_validation :cook_description

    def active_now?(now = Time.zone.now)
      starts_at <= now && ends_at >= now && running?
    end

    def can_enter_now?(now = Time.zone.now)
      return false if deleted? || closed?
      return false if now < starts_at
      return false if now > ends_at
      true
    end

    def lock_and_yield
      self.class.lock.where(id: id).pluck(:id)
      yield
    end

    def mark_running!(now = Time.zone.now)
      return if running? || drawn? || closed? || deleted?
      update!(status: :running) if starts_at <= now
    end

    def mark_closed!(now = Time.zone.now)
      return if closed? || deleted?
      update!(status: :closed, closed_at: now)
    end

    def soft_delete!(now = Time.zone.now)
      update!(status: :deleted, deleted_at: now)
    end

    def restore!
      update!(status: infer_status_from_time, deleted_at: nil)
    end

    def infer_status_from_time(now = Time.zone.now)
      return :drawn if drawn_at.present?
      return :closed if closed_at.present?
      return :scheduled if now < starts_at
      return :running if now <= ends_at
      :closed
    end

    private

    def cook_description
      return if description_raw.blank?
      self.description_cooked = PrettyText.cook(description_raw)
    end

    def validate_times
      return if starts_at.blank? || ends_at.blank?
      errors.add(:ends_at, :invalid) if ends_at <= starts_at
    end

    def validate_draw_at
      return unless auto?
      errors.add(:draw_at, :blank) if draw_at.blank?
      return if draw_at.blank? || ends_at.blank?
      errors.add(:draw_at, :invalid) if draw_at < ends_at
    end
  end
end
