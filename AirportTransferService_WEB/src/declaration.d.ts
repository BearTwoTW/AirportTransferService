/**
 * @author Yu
 * @date 2023/12/1
 * @description ts認不得css文件，所以需要定義.d.ts文件，讓ts認得css文件
 */
declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}
