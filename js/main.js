'use strict';

{
  // -- 定数 ---------------------------------------

  // コースキャラクターサイズ
  const courseSizes = [2, 2, 6, 4];
  const grandPrisSize = courseSizes[1] * courseSizes[2];
  const characterSizes = [6, 8];
  const characterSize = characterSizes[0] * characterSizes[1];

  // グランプリ名
  const grandPrixNames = [
    ['AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL',],
    ['BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL',],
  ];

  // DLC
  const DLC = 0;

  // コース名
  const CourseNames = [
    [
      ['AA0', 'AA1', 'AA2', 'AA3',],
      ['AB0', 'AB1', 'AB2', 'AB3',],
      ['AC0', 'AC1', 'AC2', 'AC3',],
      ['AD0', 'AD1', 'AD2', 'AD3',],
      ['AE0', 'AE1', 'AE2', 'AE3',],
      ['AF0', 'AF1', 'AF2', 'AF3',],
      ['AG0', 'AG1', 'AG2', 'AG3',],
      ['AH0', 'AH1', 'AH2', 'AH3',],
      ['AI0', 'AI1', 'AI2', 'AI3',],
      ['AJ0', 'AJ1', 'AJ2', 'AJ3',],
      ['AK0', 'AK1', 'AK2', 'AK3',],
      ['AL0', 'AL1', 'AL2', 'AL3',],
    ],
    [
      ['BA0', 'BA1', 'BA2', 'BA3',],
      ['BB0', 'BB1', 'BB2', 'BB3',],
      ['BC0', 'BC1', 'BC2', 'BC3',],
      ['BD0', 'BD1', 'BD2', 'BD3',],
      ['BE0', 'BE1', 'BE2', 'BE3',],
      ['BF0', 'BF1', 'BF2', 'BF3',],
      ['BG0', 'BG1', 'BG2', 'BG3',],
      ['BH0', 'BH1', 'BH2', 'BH3',],
      ['BI0', 'BI1', 'BI2', 'BI3',],
      ['BJ0', 'BJ1', 'BJ2', 'BJ3',],
      ['BK0', 'BK1', 'BK2', 'BK3',],
      ['BL0', 'BL1', 'BL2', 'BL3',],
    ],
  ];

  // キャラクター名
  const characterNames = [
    ['aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah',],
    ['ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh',],
    ['ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'cg', 'ch',],
    ['da', 'db', 'dc', 'dd', 'de', 'df', 'dg', 'dh',],
    ['ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'eg', 'eh',],
    ['fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 'fh',],
  ];

  // -- 取得 --------------------------------------------

  const title = document.querySelector('.title');
  const grandPrixes = document.querySelectorAll('.grand-prix');
  const courses = document.querySelectorAll('.course');
  const characters = document.querySelectorAll('.character');

  // --名前表示------------------------------------------

  // グランプリ名表示
  for (let i = 0; i < grandPrisSize; i++) {
    grandPrixes[i].textContent = grandPrixNames[DLC][i];
  }

  // キャラクター名表示
  for (let i = 0; i < characterSizes[0]; i++) {
    for (let j = 0; j < characterSizes[1]; j++) {
      characters[i * characterSizes[1] + j].textContent = characterNames[i][j];
    }
  }

  // -- 選択 ---------------------------------------------

  // 変数
  let selectedGrandPrix, selectedCourse = '', selectedCaracter = '', selected = undefined;

  // 初期値
  for (let i = 0; i < grandPrisSize; i++) {
    for (let j = 0; j < courseSizes[3]; j++) {
      selected = `${String(i)} ${String(j)}`;
      localStorage.setItem(selected, 48);
    }
  }

  selected = `${undefined} ${undefined}`

  // グランプリ選択
  for (let i = 0; i < grandPrisSize; i++) {
    grandPrixes[i].addEventListener('click', () => {
      selectedGrandPrix = String(i);
      selectedCourse = undefined;
      console.log(i);
      for (let j = 0; j < grandPrisSize; j++) {
        grandPrixes[j].classList.remove('checked');
      }
      grandPrixes[i].classList.add('checked');
      for (let j = 0; j < courseSizes[3]; j++) {
        courses[j].classList.add('active');
        courses[j].classList.remove('checked');
        // コース名表示
        courses[j].textContent = CourseNames[DLC][i][j];
      }
      for (let j = 0; j < characterSize; j++) {
        characters[j].classList.remove('active');
        characters[j].classList.remove('checked');
      }
    });
  }

  // コース選択
  for (let j = 0; j < courseSizes[3]; j++) {
    courses[j].addEventListener('click', () => {
      selectedCourse = String(j);
      selected = `${selectedGrandPrix} ${selectedCourse}`;
      console.log(j)
      for (let k = 0; k < courseSizes[3]; k++) {
        courses[k].classList.remove('checked');
      }
      courses[j].classList.add('checked');
      for (let k = 0; k < characterSize; k++) {
        characters[k].classList.add('active');
        characters[k].classList.remove('checked');
      }
      characters[localStorage.getItem(selected)].classList.add('checked');
    });
  }

  // キャラクター選択
  for (let k = 0; k < characterSize; k++) {
    characters[k].addEventListener('click', () => {
      selectedCaracter = k;
      console.log(k);
      for (let l = 0; l < characterSize; l++) {
        characters[l].classList.remove('checked');
      }
      characters[k].classList.add('checked');
      localStorage.setItem(selected, selectedCaracter);
    });
  }

  // ------------------------------

  // ローカルストレージクリア
  title.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
    // selectedGrandPrix = undefined;
    selectedCourse = undefined;
    selectedCaracter = 48;
    selected = undefined;
    // for (let j = 0; j < grandPrisSize; j++) {
    //   grandPrixes[j].classList.remove('checked');
    // }
    for (let k = 0; k < courseSizes[3]; k++) {
      // courses[k].classList.remove('active');
      courses[k].classList.remove('checked');
    }
    for (let l = 0; l < characterSize; l++) {
      characters[l].classList.remove('active');
      characters[l].classList.remove('checked');
    }
  });

}