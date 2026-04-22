import threading
import customtkinter as ctk
from pynput import mouse, keyboard
import pystray
from PIL import Image, ImageDraw

# 配置 CustomTkinter 的主题和外观（简约高级风格）
ctk.set_appearance_mode("System")  # 跟随系统主题 (Dark/Light)
ctk.set_default_color_theme("blue")  # 默认蓝色主题

class ActivityTrackerApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("键盘鼠标记录器")
        self.geometry("380x360")
        self.resizable(False, False)
        
        # 统计数据变量
        self.mouse_clicks = 0
        self.key_presses = 0
        self.char_count = 0
        
        # 构建 UI
        self.setup_ui()
        
        # 钩子变量
        self.mouse_listener = None
        self.keyboard_listener = None
        
        # 启动监听
        self.start_tracking()

        # 拦截关闭事件，使其最小化到托盘
        self.protocol("WM_DELETE_WINDOW", self.hide_window)

    def setup_ui(self):
        # 标题
        self.title_label = ctk.CTkLabel(
            self, text="Activity Tracker", font=ctk.CTkFont(size=24, weight="bold")
        )
        self.title_label.pack(pady=(20, 10))

        # 统计数据框
        self.stats_frame = ctk.CTkFrame(self, corner_radius=15, fg_color=("gray90", "gray16"))
        self.stats_frame.pack(pady=10, padx=20, fill="both", expand=True)

        # 鼠标点击次数
        self.mouse_label = ctk.CTkLabel(
            self.stats_frame, text="🖱️ 鼠标点击: 0 次", font=ctk.CTkFont(size=16)
        )
        self.mouse_label.pack(pady=(20, 10))

        # 键盘按键次数
        self.keyboard_label = ctk.CTkLabel(
            self.stats_frame, text="⌨️ 键盘按键: 0 次", font=ctk.CTkFont(size=16)
        )
        self.keyboard_label.pack(pady=(10, 10))
        
        # 字符输入量
        self.char_label = ctk.CTkLabel(
            self.stats_frame, text="📝 输入字符: 0 个", font=ctk.CTkFont(size=16)
        )
        self.char_label.pack(pady=(10, 20))

        # 重置按钮 (红色强调)
        self.reset_button = ctk.CTkButton(
            self, text="重置数据", command=self.reset_counters, 
            corner_radius=20, fg_color="#E74C3C", hover_color="#C0392B",
            font=ctk.CTkFont(size=14, weight="bold")
        )
        self.reset_button.pack(pady=(10, 20))

    def update_ui(self):
        # 更新UI界面（由于pynput在子线程运行，使用after确保在主线程更新UI）
        self.mouse_label.configure(text=f"🖱️ 鼠标点击: {self.mouse_clicks} 次")
        self.keyboard_label.configure(text=f"⌨️ 键盘按键: {self.key_presses} 次")
        self.char_label.configure(text=f"📝 输入字符: {self.char_count} 个")

    def on_click(self, x, y, button, pressed):
        if pressed:
            self.mouse_clicks += 1
            self.after(0, self.update_ui)

    def on_press(self, key):
        self.key_presses += 1
        
        # 简单判断是否为有效输入字符
        if hasattr(key, 'char') and key.char is not None:
            self.char_count += 1
        elif key in [keyboard.Key.space, keyboard.Key.enter, keyboard.Key.backspace]:
            self.char_count += 1
            
        self.after(0, self.update_ui)

    def start_tracking(self):
        # 启动全局鼠标和键盘监听
        self.mouse_listener = mouse.Listener(on_click=self.on_click)
        self.keyboard_listener = keyboard.Listener(on_press=self.on_press)
        self.mouse_listener.start()
        self.keyboard_listener.start()

    def reset_counters(self):
        # 重置统计数据
        self.mouse_clicks = 0
        self.key_presses = 0
        self.char_count = 0
        self.update_ui()

    # --- 系统托盘功能 ---
    def hide_window(self):
        # 隐藏主窗口
        self.withdraw()
        # 创建托盘图标
        image = self.create_image()
        menu = pystray.Menu(
            pystray.MenuItem('显示主窗口', self.show_window, default=True),
            pystray.MenuItem('退出', self.quit_app)
        )
        self.tray_icon = pystray.Icon("Activity Tracker", image, "鼠标键盘记录器", menu)
        # 在独立线程运行托盘，防止阻塞Tkinter主循环
        threading.Thread(target=self.tray_icon.run, daemon=True).start()

    def show_window(self, icon, item):
        # 停止托盘图标运行并重新显示主窗口
        icon.stop()
        self.after(0, self.deiconify)

    def quit_app(self, icon, item):
        # 完全退出程序
        icon.stop()
        self.mouse_listener.stop()
        self.keyboard_listener.stop()
        self.destroy()

    def create_image(self):
        # 生成一个简单的托盘图标（蓝黑配色的正方形）
        width = 64
        height = 64
        color1 = "#2C3E50"
        color2 = "#3498DB"
        image = Image.new('RGB', (width, height), color1)
        dc = ImageDraw.Draw(image)
        dc.rectangle((width // 2, 0, width, height // 2), fill=color2)
        dc.rectangle((0, height // 2, width // 2, height), fill=color2)
        return image

if __name__ == "__main__":
    app = ActivityTrackerApp()
    app.mainloop()
