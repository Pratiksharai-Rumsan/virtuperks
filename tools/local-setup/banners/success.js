const displaySuccess = () => {
    const successMessage = `  ______   __    __   ______    ______   ________   ______    ______  
 /      \ /  |  /  | /      \  /      \ /        | /      \  /      \ 
/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |$$$$$$$$/ /$$$$$$  |/$$$$$$  |
$$ \__$$/ $$ |  $$ |$$ |  $$/ $$ |  $$/ $$ |__    $$ \__$$/ $$ \__$$/ 
$$      \ $$ |  $$ |$$ |      $$ |      $$    |   $$      \ $$      \ 
 $$$$$$  |$$ |  $$ |$$ |   __ $$ |   __ $$$$$/     $$$$$$  | $$$$$$  |
/  \__$$ |$$ \__$$ |$$ \__/  |$$ \__/  |$$ |_____ /  \__$$ |/  \__$$ |
$$    $$/ $$    $$/ $$    $$/ $$    $$/ $$       |$$    $$/ $$    $$/ 
 $$$$$$/   $$$$$$/   $$$$$$/   $$$$$$/  $$$$$$$$/  $$$$$$/   $$$$$$/  
                                                                      
                                                                      
                                                                      `
  
    console.log("\x1b[32m%s\x1b[0m", successMessage);
  };
  
  displaySuccess();