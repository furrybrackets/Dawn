if [[ $OSTYPE == 'darwin'* ]]; then
    brew install cmake llvm && yarn add llvm-bindings
    export PATH="/opt/homebrew/opt/llvm/bin:$PATH" >> ~/.zshrc
else if [[ $OSTYPE == 'linux-gnu' ]]; then
  #install llvm by installation script
    wget https://apt.llvm.org/llvm.sh
    sudo chmod +x llvm.sh
    sudo ./llvm.sh 13

# install cmake and zlib by apt-get
    sudo apt-get install cmake zlib1g-dev

# install llvm-bindings by npm
    npm install llvm-bindings
else
    echo 'Unknown OS'
fi
fi