function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Translator')
      .addItem('Show Translator', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Translator');
  SpreadsheetApp.getUi().showSidebar(html);
}

function getSheetNames() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets().map(sheet => sheet.getName());
}

function getSheetData(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (sheet) {
    return sheet.getDataRange().getValues();
  }
  throw new Error("Sheet not found: " + sheetName);
}

function translateRows(rows, sourceLang, targetLang) {
  return rows.map(row =>
    row.map(cell => {
      if (typeof cell === 'string' && cell.trim() !== '') {
        try {
          // Reuse the existing text translation logic
          return translateText(cell, sourceLang, targetLang);
        } catch (e) {
          return "Error: " + e.message;
        }
      }
      return cell;
    })
  );
}

function createSheetWithData(sheetName, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let newSheet = ss.getSheetByName(sheetName);
  if (newSheet) {
    newSheet.clear();
  } else {
    newSheet = ss.insertSheet(sheetName);
  }
  if (data && data.length > 0 && data[0].length > 0) {
    newSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  }
  return "Sheet '" + sheetName + "' created successfully.";
}

// This function remains as a helper for translateRows
function translateText(text, sourceLang, targetLang) {
  if (text.length > 490) {
    const chunks = splitText(text, 490);
    const translatedChunks = chunks.map(chunk => callTranslationApi(chunk, sourceLang, targetLang));
    return translatedChunks.join('');
  } else {
    return callTranslationApi(text, sourceLang, targetLang);
  }
}

function callTranslationApi(text, sourceLang, targetLang) {
  var langPair = encodeURIComponent(sourceLang + "|" + targetLang);
  var url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=" + langPair;
  
  var params = {
    'method': 'get',
    'muteHttpExceptions': true
  };
  var response = UrlFetchApp.fetch(url, params);
  var json = JSON.parse(response.getContentText());

  if (json.responseStatus !== 200) {
    throw new Error(json.responseDetails || 'Unknown API Error');
  }
  
  if (json.responseData && json.responseData.translatedText) {
    const translated = json.responseData.translatedText;
    if (translated.startsWith("INVALID LANGUAGE PAIR")) {
      throw new Error(translated);
    }
    return translated;
  } else {
    throw new Error(json.responseDetails || 'Could not translate.');
  }
}

function splitText(text, chunkSize) {
    const chunks = [];
    let i = 0;
    while (i < text.length) {
        chunks.push(text.slice(i, i + chunkSize));
        i += chunkSize;
    }
    return chunks;
}