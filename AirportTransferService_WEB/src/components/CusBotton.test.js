import React from 'react'
import { render, screen } from '@testing-library/react'// 把 testing-library 常用的值引用進來
import '@testing-library/jest-dom/extend-expect' // 將檢測用的 expect 函式 引用進來（後面會看到）
import userEvent from '@testing-library/user-event';
import { CusTextButton } from '../components/CusButton';


describe('測試Button是否正常', () => {
  test('當按下按鈕時，確定 mockFunc 會被呼叫', () => {
    const mockFunc = jest.fn(); // 宣告一個模擬用的函式
    // 將 TodoButton 渲染出來，因為之後才可以被抓得到
    render(
      <CusTextButton
        variant="primary"
        text={"測試Button"}
        onClick={mockFunc}
      />
    );

    const todoButton = screen.getByText('測試Button') // 在這邊「 Add todo 」是 TodoButton 裡面的內容
    userEvent.click(todoButton); // 模擬使用者的點擊行為
    expect(mockFunc).toBeCalledTimes(1); // 去預測函式是否真的因為點擊而被呼叫

    userEvent.click(todoButton);
    expect(mockFunc).toBeCalledTimes(2);

    screen.debug(todoButton)
  });
});
