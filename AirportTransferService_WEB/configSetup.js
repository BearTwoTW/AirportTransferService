// configSetup.js
const fs = require('fs');
const path = require('path');

// 讀取客戶配置檔案
const clientsConfigPath = path.resolve(__dirname, 'clientsConfig.json');
const clientsConfig = require(clientsConfigPath);

// 根據需要的客戶名稱，這裡假設使用環境變數或其他方式指定
const targetClientName = process.env.TARGET_CLIENT || 'ECC';

// 找到目標客戶的配置
const targetClientConfig = clientsConfig.find(client => client.clientName === targetClientName);

if (!targetClientConfig) {
  console.error(`未找到名為 ${targetClientName} 的客戶配置。`);
  process.exit(1);
}

// 讀取原始的 index.html
const indexPath = path.resolve(__dirname, 'build', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// 替換標題
indexContent = indexContent.replace(/<title>.*<\/title>/, `<title>${targetClientConfig.title}</title>`);
indexContent = indexContent.replace(/<meta name="description" content=".*"\/>/, `<meta name="description" content="${targetClientConfig.description}" />`);

// 塞入GA追蹤碼
const position = indexContent.indexOf('</head>');// 找到</head>標籤的位置
const newScript = targetClientConfig.ga_script;
indexContent = [indexContent.slice(0, position), newScript, indexContent.slice(position)].join('');// 將新的<script>標籤塞到</head>之前

// 寫入生成的 index.html
const buildIndexPath = path.resolve(__dirname, 'build', 'index.html');
fs.writeFileSync(buildIndexPath, indexContent, 'utf-8');

/** 依照客戶執行語法
 * 
 * 元福測試機
 * set TARGET_CLIENT=ECC&& npm run build
 * 
 * 瑞達測試機
 * set TARGET_CLIENT=eccrdetest&& npm run build
 * 
 * 瑞達正式機
 * set TARGET_CLIENT=eccrde&& npm run build
 */

/** 使用 PowerShell 條件執行
 * 如果您想要模仿 && 的行為（僅當第一個命令成功時，才運行第二個命令），您可以使用 PowerShell 的條件執行語法
 *  ===>>>>  $env:TARGET_CLIENT="ECC" ; if ($?) { npm run build }
 */