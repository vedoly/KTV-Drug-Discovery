mol='<RX_6> C # C C C C C C ( C ) ( C ) c 1 c c ( O C ) c c ( O C ) c 1'
beam_size=5
dataset=USPTO-50K # USPTO-50K for Self-Corrected Retrosynthetic Reaction Predictor
model=${dataset}_model_step_500000.pt

echo ${mol} > ./tmp/src.txt

python ./translate.py -model ./experiments/models/${model} \
                    -src ./tmp/src.txt \
                    -output ./tmp/tgt.txt \
                    -verbose \
                    -batch_size 64 -replace_unk -max_length 200 -beam_size ${beam_size} -n_best ${beam_size}\
                    -dump_beam ./tmp/beam.json

python ../visualize.py

python ../VisTools/generate_beam_viz.py -d ./tmp/beam.json -o ./tmp/beam
                    
                    