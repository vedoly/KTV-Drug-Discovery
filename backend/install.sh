# e.g. for Mac, change to https://repo.continuum.io/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
# wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh 
wget https://repo.continuum.io/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
bash ./Miniconda3-latest-MacOSX-x86_64.sh -b -p $HOME/miniconda
export PATH="$HOME/miniconda/bin:$PATH"

# create a new environment named cgvae
conda create --name seniorBackend python=3.6 pip -y 
source activate seniorBackend

# install cython
pip install Cython --install-option="--no-cython-compile"

# install rdkit
conda install -c rdkit rdkit -y

conda install future six tqdm pandas -y
conda install pytorch=1.5.1 torchvision -c pytorch -y

# install tensorflow 1.3
pip install tensorflow==1.3

pip install torchtext==0.3.1
pip install -e . 

# install other requirements
pip install -r requirements.txt

# remove conda bash
rm ./Miniconda3-latest-Linux-x86_64.sh