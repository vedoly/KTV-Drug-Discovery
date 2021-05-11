import numpy as np; np.random.seed(0)
import seaborn as sns; #sns.set_theme()
import matplotlib.pyplot as plt
import pickle
import onmt
import glob, os
import sys

from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit.Chem import Draw
from rdkit.Chem.Draw import rdMolDraw2D

import os
os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"

def get_concat_h_multi_resize(im_list, resample=Image.BICUBIC):
    min_height = min(im.height for im in im_list)
    im_list_resize = [im.resize((int(im.width * min_height / im.height), min_height),resample=resample)
                      for im in im_list]
    total_width = sum(im.width for im in im_list_resize)
    dst = Image.new('RGB', (total_width, min_height))
    pos_x = 0
    for im in im_list_resize:
        dst.paste(im, (pos_x, 0))
        pos_x += im.width
    return dst
def get_concat_v_multi_resize(im_list, resample=Image.BICUBIC):
    min_width = min(im.width for im in im_list)
    im_list_resize = [im.resize((min_width, int(im.height * min_width / im.width)),resample=resample)
                      for im in im_list]
    total_height = sum(im.height for im in im_list_resize)
    dst = Image.new('RGB', (min_width, total_height))
    pos_y = 0
    for im in im_list_resize:
        dst.paste(im, (0, pos_y))
        pos_y += im.height
    return dst
    
#-----[draw reactions]-----
    
src = './tmp/src.txt'
tgt = './tmp/tgt.txt'
src_file = open(src)
tgt_file = open(tgt)
srcs = [''.join(l.split()[1:]).strip() for l in src_file]
tgts = [l.replace(' ','').strip() for l in tgt_file]
rxns = []
for src in srcs:
  for tgt in tgts:
    reaction = tgt+'>>'+src
    try:rxns.append(AllChem.ReactionFromSmarts(reaction, useSmiles=True))
    except: pass
for i, rxn in enumerate(rxns): 
  drawer = rdMolDraw2D.MolDraw2DCairo(1000, 300)
  drawer.DrawReaction(rxn)
  drawer.FinishDrawing()
  drawer.WriteDrawingText('./tmp/'+str(i)+'_reaction_tmp.png')
  img = Image.open('./tmp/'+str(i)+'_reaction_tmp.png')
  draw = ImageDraw.Draw(img)
  font = ImageFont.truetype("../arial.ttf", 20)
  draw.text((10, 0), 'rank'+ str(i+1), (0,0,0), font=font)
  img.save('./tmp/'+str(i)+'_reaction_tmp.png')


#-----[draw heatmap]-----

tmp_path = './tmp/'
results_path = tmp_path+'/result.pkl'
file = open(results_path, 'rb')
results = pickle.load(file)
file.close()

translations = results[2]

for t in range(len(translations)):  
  fig, ax = plt.subplots(figsize=(10,10))      
  sns.heatmap(translations[t].attns[0], xticklabels=translations[t].src_raw, yticklabels=translations[t].pred_sents[0])
  plt.yticks(rotation=0) 
  plt.xticks(rotation=0) 
  plt.savefig('./tmp/heatmap_tmp.png')
  # plt.show()

#----[merge img]----
reaction_img_names = glob.glob("./tmp/*reaction_tmp.png")
reaction_img_list = [Image.open(img) for img in reaction_img_names] 
get_concat_v_multi_resize(reaction_img_list).save('./tmp/reactions_tmp.png')

report_img_list = [Image.open(img) for img in ["./tmp/reactions_tmp.png", "./tmp/heatmap_tmp.png"]]
get_concat_h_multi_resize(report_img_list).save('./tmp/report.png')
for img_name in glob.glob("./tmp/*_tmp.png"): os.remove(img_name)

#----[show img]----
Image.open("./tmp/report.png").show()