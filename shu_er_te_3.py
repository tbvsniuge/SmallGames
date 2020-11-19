# Button 模式 需要按照顺序点 （注意力）
import tkinter
import random
import time


def generate_button_data():
    max = 25
    numbers = list(range(1, max + 1))
    random.shuffle(numbers)
    data_list = []
    for number in numbers:
        value = {"number": number, "button": None}
        data_list.append(value)
    return data_list


class ShuErTe:
    def __init__(self, size_x=300, size_y=500):
        self.top = tkinter.Tk()
        self.top.minsize(size_x, size_y)
        self.countdown_flg = False

    def button_command(self, index):
        button_number = self.button_data_list[index]['number']
        current_button = self.button_data_list[index]['button']
        if button_number == self.click_count:
            if self.click_count == 25:
                self.countdown_flg = False
                time_data = int(self.time_label['text'])
                self.score_label['text'] = int((25 / time_data) * 100)
            self.click_count += 1
        else:
            self.countdown_flg = False
            time_data = int(self.time_label['text'])
            self.score_label['text'] = int(
                (self.click_count / time_data) * 100)
            for button_data_obj in self.button_data_list:
                if button_data_obj['number'] < self.click_count:
                    button_data_obj['button']['bg'] = 'green'
            current_button['bg'] = 'red'

    def generate_buttons(self):
        self.button_data_list = generate_button_data()

        for index, button_data_obj in enumerate(self.button_data_list):
            button_data_obj['button'] = tkinter.Button(
                self.top,
                text=button_data_obj['number'],
                font=('黑体', 16),
                command=lambda index=index: self.button_command(index))
            width = 60
            height = 60
            place_x = (index % 5) * width
            place_y = (index // 5) * height + 20

            button_data_obj['button'].place(x=place_x,
                                            y=place_y,
                                            width=width,
                                            height=height)

        self.countdown_flg = True
        self.click_count = 1
        self.score_label['text'] = ''
        self.countdown_start_time = time.time()
        self.start_count_down()

    def start_count_down(self):
        if self.countdown_flg is True:
            count_down_number = int(time.time() - self.countdown_start_time)
            self.time_label['text'] = count_down_number

            self.top.after(1000, self.start_count_down)

    def main_func(self):
        button_gen = tkinter.Button(self.top,
                                    text='GEN',
                                    command=self.generate_buttons)
        button_gen.place(x=40, y=380, width=80, height=40)

        self.time_label = tkinter.Label(self.top, text='0')
        self.time_label.place(x=170, y=380, width=80, height=40)

        self.score_label = tkinter.Label(self.top, text='')
        self.score_label.place(x=150, y=420, width=80, height=40)

        self.top.mainloop()


if __name__ == "__main__":
    shu_er_te = ShuErTe()
    shu_er_te.main_func()
