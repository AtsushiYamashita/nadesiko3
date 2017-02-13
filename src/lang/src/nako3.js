//
// nadesiko ver3
//
if (typeof(navigator) == "object") {
  setTimeout(()=>{
    nako3_browser();
  },1);
}

function nako3_browser(){
  // スクリプトタグの中身を得る
  let scripts = document.querySelectorAll("script");
  for (let i = 0; i < scripts.length; i++) {
    let script = scripts[i];
    let type = script.type;
    if (type == "nako" || type =="なでしこ") {
      nako3_browser_run_script(script);
    }
  }
}

function nako3_browser_run_script(script) {
  let code = script.text;
  let type = script.type;
  let option = script.option;
  nako3_run(code);
}

function nako3_run(code) {
  console.log("今作ってます。");
  // tokenize
  // compile
  // run
}


