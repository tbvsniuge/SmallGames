# 输入模式

# Button 模式 需要按照顺序点
import tkinter
import random
import time


def generate_button_data():
    max = 25
    numbers = list(range(1, max + 1))
    random.shuffle(numbers)
    data_list = []
    for number in numbers:
        value = {"number": number, "label": None, "input": None}
        data_list.append(value)
    return data_list


class ShuErTe:
    def __init__(self, size_x=700, size_y=500):
        self.top = tkinter.Tk()
        self.top.minsize(size_x, size_y)
        self.click_count = 1
        self.countdown_flg = False

    def button_command(self, index):
        button_number = self.button_data_list[index]['number']
        current_button = self.button_data_list[index]['button']
        if current_button['text'] == '':
            current_button['text'] = button_number
            if self.click_count == button_number:
                current_button['bg'] = 'green'
            else:
                current_button['bg'] = 'red'
            self.click_count += 1

    def generate_shuerte_fangge(self):
        self.button_data_list = generate_button_data()

        for index, button_data_obj in enumerate(self.button_data_list):
            button_data_obj['label'] = tkinter.Label(
                self.top,
                text=button_data_obj['number'],
                font=('黑体', 18),
                relief='groove')
            width = 60
            height = 60
            place_x = (index % 5) * width + 20
            place_y = (index // 5) * height + 20

            button_data_obj['label'].place(x=place_x,
                                           y=place_y,
                                           width=width,
                                           height=height)

        self.ref_buttons = []
        for i in range(25):
            button_temp = tkinter.Label(self.top,
                                        text='',
                                        font=('黑体', 18),
                                        relief='groove')
            width = 60
            height = 60
            place_x = (i % 5) * width + 380
            place_y = (i // 5) * height + 20

            button_temp.place(x=place_x, y=place_y, width=width, height=height)
            self.ref_buttons.append(button_temp)

        self.countdown_flg = True
        self.countdown_start_time = time.time()

    def start_gm(self):
        self.countdown_flg = False

        for index, button_data_obj in enumerate(self.button_data_list):
            button_data_obj['input'] = tkinter.Entry(self.top,
                                                     justify='center',
                                                     font=('黑体', 18),
                                                     relief='groove')
            width = 60
            height = 60
            place_x = (index % 5) * width + 20
            place_y = (index // 5) * height + 20

            button_data_obj['input'].place(x=place_x,
                                           y=place_y,
                                           width=width,
                                           height=height)

            button_data_obj['label'] = None

    def start_count_down(self):
        if self.countdown_flg is True:
            count_down_number = int(time.time() - self.countdown_start_time)
            self.button_begin['text'] = count_down_number
            if count_down_number >= 25:
                self.start_gm()

            self.top.after(1000, self.start_count_down)

    def show_ref(self):
        for index, ref_button in enumerate(self.ref_buttons):
            ref_button['text'] = self.button_data_list[index]["number"]
        self.red_count_start_time = time.time()
        self.ref_count()

    def ref_count(self):
        count_down_number = 3 - int(time.time() - self.red_count_start_time)
        self.button_show_ref['text'] = count_down_number
        if count_down_number <= 0:
            self.button_show_ref['text'] = 'SHOW REF'
            for ref_data_obj in self.ref_buttons:
                ref_data_obj['text'] = ''
        else:
            self.top.after(1000, self.ref_count)

    def calculate_score(self):
        score = 0
        for data_obj in self.button_data_list:
            input_value = data_obj['input'].get()
            actual_value = data_obj['number']
            if input_value == str(actual_value):
                score += 4

        score_label = tkinter.Label(self.top,
                                    text="SCORE: " + str(score),
                                    font=('黑体', 15),
                                    relief='groove')
        score_label.place(x=270, y=435, width=160, height=40)

    def main_func(self):
        button_gen = tkinter.Button(self.top,
                                    text='GEN',
                                    command=self.generate_shuerte_fangge)
        button_gen.place(x=25, y=380, width=80, height=40)

        self.button_begin = tkinter.Button(self.top,
                                           text='STA',
                                           command=self.start_gm)
        self.button_begin.place(x=235, y=380, width=80, height=40)

        self.button_show_ref = tkinter.Button(self.top,
                                              text='SHOW REF',
                                              command=self.show_ref)
        self.button_show_ref.place(x=490, y=380, width=80, height=40)

        self.button_calculate_score = tkinter.Button(
            self.top, text='CALCU', command=self.calculate_score)
        self.button_calculate_score.place(x=130, y=435, width=80, height=40)

        self.start_count_down()
        self.top.mainloop()


if __name__ == "__main__":
    shu_er_te = ShuErTe()
    shu_er_te.main_func()
