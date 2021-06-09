import sys
sys.path.insert(1, './Generative/CGVAE')

from flask import Flask, render_template, url_for, request, redirect, send_file, send_from_directory
from flask_bootstrap import Bootstrap
from flask_cors import CORS, cross_origin
import pickle
import os
import glob
from CGVAE import generate_from_model
from rdkit import Chem
from rdkit.Chem import Draw

app = Flask(__name__)
Bootstrap(app)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/generative/generate',methods=['POST'])
def generate():
    model_path = {0:"CGVAE",1:"CGVAE"}
    model_id = int(request.json['modelId'])
    num = int(request.json['num'])
    generated_smiles_with_qed = []
    if model_id==0:        
        # choice 1 : pickle
        with open(f'./Generative/{model_path[model_id]}/pkl/generated_smiles_with_qed_500.pkl', "rb") as generated_smiles_with_qed_file: #gen again tonight seed 0 pls no sort
            generated_smiles_with_qed = pickle.load(generated_smiles_with_qed_file)[:num]
        # choice 2 : actual run
        if num > 1000:
            args = {'--config': '{"generation": true, "number_of_generation": '+str(num-1000)+', "random_seed":1}',
                    '--config-file': None,
                    '--data_dir': 'Generative/CGVAE',
                    '--dataset': 'zinc',
                    '--freeze-graph-model': False,
                    '--help': False,
                    '--log_dir': None,
                    '--restore': 'Generative/CGVAE/pkl/3_zinc.pickle'}
                
            generated_smiles_with_qed += generate_from_model(args)

    elif model_id==1:        
        # choice 1 : pickle
        with open(f'./Generative/{model_path[model_id]}/pkl/generated_smiles_with_qed_500.pkl', "rb") as generated_smiles_with_qed_file: #gen new seed tonight (seed15) no sort
            generated_smiles_with_qed = pickle.load(generated_smiles_with_qed_file)[:num]
        # choice 2 : actual run
        if num > 1000:
            args = {'--config': '{"generation": true, "number_of_generation": '+str(num-1000)+', "random_seed":16}',
                    '--config-file': None,
                    '--data_dir': 'Generative/CGVAE',
                    '--dataset': 'zinc',
                    '--freeze-graph-model': False,
                    '--help': False,
                    '--log_dir': None,
                    '--restore': 'Generative/CGVAE/pkl/3_zinc.pickle'}
                
            generated_smiles_with_qed += generate_from_model(args)
    generated_smiles_with_qed.sort(key=lambda x: -x[1])

    for (smiles,qed) in generated_smiles_with_qed:
        m = Chem.MolFromSmiles(smiles)
        Draw.MolToFile(m, "./tmp/gen_"+smiles.replace("#","$")+".png")
        Draw.MolToFile(m, "./tmp/"+smiles.replace("#","$")+".png")

    return {'result' : generated_smiles_with_qed}

@app.route("/get-image/<image_name>")
def get_image(image_name):
    
    app.config["CLIENT_IMAGES"] = 'tmp/'
    
    try:
        return send_from_directory(app.config["CLIENT_IMAGES"], filename=image_name)
    except FileNotFoundError:
        abort(404)
    
@app.after_request
def add_header(response):
    response.cache_control.no_store = True
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    return response

# @app.route('/retrosynthesis',methoed='')
if __name__ == '__main__':
    app.run(debug=True, port=5555)
