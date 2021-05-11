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

import matplotlib
matplotlib.use('Agg')
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
    
def draw_reaction(path):
  src = path+'src10.txt'
  tgt = path+'tgt10.txt'
  src_file = open(src)
  tgt_file = open(tgt)
  srcs = [(l.split()[0][1:-1], ''.join(l.split()[1:]).strip()) for l in src_file]
  tgts = [l.replace(' ','').strip() for l in tgt_file]
  rxns = []
  for i in range(len(srcs)):
    reaction_class, src  = srcs[i]
    tgt  = tgts[i]
    product = tgt.split(".")
   
    # pic = [Draw.MolToImage(Chem.MolFromSmiles(e)) for e in product]
    for i,c in enumerate(product):
      try: 
        pic = Draw.MolToImage(Chem.MolFromSmiles(c))
        c = c.replace("/",'v')
        c = c.replace(chr(92),'w')
        print(c)
        pic.save("tmp/"+str(c)+".png",transparent=True)
      except: pass
      
    reaction = tgt+'>>'+src
    print(reaction,"xxxx")
    try:rxns.append((reaction_class, AllChem.ReactionFromSmarts(reaction, useSmiles=True),product))
    except: print('invalid smiles '+src)
  print(rxns)
  for i, (reaction_class, rxn,product) in enumerate(rxns): 
    # pic = [Draw.MolToImage(e) for e in product]
    drawer = rdMolDraw2D.MolDraw2DCairo(1000, 300)
    drawer.DrawReaction(rxn)
    drawer.FinishDrawing()
    drawer.WriteDrawingText(path+reaction_class+'_reaction_tmp.png')
    img = Image.open(path+reaction_class+'_reaction_tmp.png')
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype("arial.ttf", 20)
    draw.text((10, 0), reaction_class, (0,0,0), font=font)
    img.save(path+reaction_class+'_reaction_tmp.png')


def draw_heat_map(path):
  tmp_path = path
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
    plt.savefig(f'{tmp_path}/heatmap_tmp{t}.png')
    # plt.show()

def draw_reaction2(reactions):
  for i,reaction in enumerate(reactions):
    rxn = AllChem.ReactionFromSmarts(reaction, useSmiles=True)
    drawer = rdMolDraw2D.MolDraw2DCairo(1000, 300)
    drawer.DrawReaction(rxn)
    drawer.FinishDrawing()
    drawer.WriteDrawingText('path/'+str(i)+'.png')
    img = Image.open('path/'+str(i)+'.png')
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype("arial.ttf", 20)
    draw.text((10, 0), "", (0,0,0), font=font)
    img.save('path/'+str(i)+'.png')
