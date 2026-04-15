class CreateDiscourseLotteryTables < ActiveRecord::Migration[7.0]
  def change
    create_table :discourse_lotteries do |t|
      t.string :title, null: false
      t.integer :cover_upload_id
      t.string :cover_image_url
      t.text :description_raw, null: false
      t.text :description_cooked, null: false
      t.integer :topic_id
      t.datetime :starts_at, null: false
      t.datetime :ends_at, null: false
      t.datetime :draw_at
      t.integer :draw_mode, null: false, default: 0
      t.integer :status, null: false, default: 0
      t.integer :participants_count, null: false, default: 0
      t.string :seed
      t.datetime :drawn_at
      t.datetime :closed_at
      t.datetime :deleted_at
      t.jsonb :conditions, null: false, default: {}
      t.integer :created_by_id, null: false
      t.timestamps
    end

    add_index :discourse_lotteries, :topic_id
    add_index :discourse_lotteries, :status
    add_index :discourse_lotteries, :draw_at
    add_index :discourse_lotteries, :ends_at
    add_index :discourse_lotteries, :deleted_at

    create_table :discourse_lottery_prizes do |t|
      t.integer :lottery_id, null: false
      t.integer :rank, null: false
      t.string :name, null: false
      t.integer :quantity, null: false
      t.integer :image_upload_id
      t.string :image_url
      t.text :description
      t.string :prize_type, null: false, default: "physical"
      t.timestamps
    end

    add_index :discourse_lottery_prizes, :lottery_id
    add_index :discourse_lottery_prizes, %i[lottery_id rank]

    create_table :discourse_lottery_entries do |t|
      t.integer :lottery_id, null: false
      t.integer :user_id, null: false
      t.inet :ip_address
      t.datetime :entered_at, null: false
      t.timestamps
    end

    add_index :discourse_lottery_entries, %i[lottery_id user_id], unique: true
    add_index :discourse_lottery_entries, %i[lottery_id entered_at]
    add_index :discourse_lottery_entries, %i[user_id entered_at]
    add_index :discourse_lottery_entries, %i[lottery_id ip_address]

    create_table :discourse_lottery_winners do |t|
      t.integer :lottery_id, null: false
      t.integer :prize_id, null: false
      t.integer :user_id, null: false
      t.datetime :drawn_at, null: false
      t.integer :delivery_status, null: false, default: 0
      t.timestamps
    end

    add_index :discourse_lottery_winners, :lottery_id
    add_index :discourse_lottery_winners, :prize_id
    add_index :discourse_lottery_winners, %i[lottery_id user_id]

    create_table :discourse_lottery_blacklist do |t|
      t.integer :user_id, null: false
      t.integer :added_by_id, null: false
      t.string :reason
      t.timestamps
    end

    add_index :discourse_lottery_blacklist, :user_id, unique: true
  end
end
