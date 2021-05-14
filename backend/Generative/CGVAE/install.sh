#!/bin/bash

# download and install miniconda
# please update the link below according to the platform you are using (https://conda.io/miniconda.html)
# e.g. for Mac, change to https://repo.continuum.io/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash ./Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda
export PATH="$HOME/miniconda/bin:$PATH"

# create a new environment named cgvae
conda create --name cgvae python=3.6 pip
source activate cgvae

# install cython
pip install Cython --install-option="--no-cython-compile"

# install rdkit
conda install -c rdkit rdkit 

# install tensorflow 1.3
pip install tensorflow==1.3

# install other requirements
pip install -r requirements.txt

# remove conda bash
rm ./Miniconda3-latest-Linux-x86_64.sh
