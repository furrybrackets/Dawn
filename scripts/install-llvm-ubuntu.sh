
#!/usr/bin/env bash
#install llvm by installation script
wget https://apt.llvm.org/llvm.sh
sudo chmod +x llvm.sh
sudo ./llvm.sh 13

# install cmake and zlib by apt-get
sudo apt-get install cmake zlib1g-dev

# install llvm-bindings by npm
npm install llvm-bindings
