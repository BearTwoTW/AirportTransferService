import React from 'react'
import { render, screen } from '@testing-library/react'// 把 testing-library 常用的值引用進來
import '@testing-library/jest-dom/extend-expect' // 將檢測用的 expect 函式 引用進來（後面會看到）
import userEvent from '@testing-library/user-event';
import { CusHtmlTooltip } from '../components/CusTooltipTS';
import { Add } from '@mui/icons-material';



/**
 *  !!!!!!!!!!!!! 還沒成功 !!!!!!!!!!!!!
 *  // TODO 測試CusHtmlTooltip是否正常
 */
describe('測試CusHtmlTooltip 包含button 類型是否正常', () => {

  test('CusHtmlTooltip 渲染成功', async () => {
    render(
      <CusHtmlTooltip
        title={"測試CusHtmlTooltipbutton"}
        type={"button"}
        content={<div>123</div>}
        placement={"bottom"}
        color={"info"}
        variant={"outlined"}
        icon={<Add />}
      />
    );

    const todoTooltip = screen.getByText('測試CusHtmlTooltipbutton')

    await screen.findByRole('button')

    expect(screen.getByRole('button')).toHaveTextContent('測試CusHtmlTooltipbutton')

    screen.debug(todoTooltip)
  });

  // test('當button hover時，確定 123 會顯示', async () => {

  //   const todoTooltip = screen.getByRole('div', { name: '123' });
  //   userEvent.hover(todoTooltip)

  //   // 檢查tooltip是否顯示
  //   // 由於MUI的Tooltip在測試環境中可能不會立即顯示，你可能需要使用findByText和/或異步查詢
  //   const tooltip = await screen.findByText('123');
  //   expect(tooltip).toBeInTheDocument();

  //   screen.debug(todoTooltip)
  //   screen.debug(tooltip)
  // });
});
