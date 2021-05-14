from CGVAE import generate_from_model
args = {'--config': '{"generation": true, "number_of_generation": 10, "random_seed":15}',
 '--config-file': None,
 '--data_dir': None,
 '--dataset': 'zinc',
 '--freeze-graph-model': False,
 '--help': False,
 '--log_dir': None,
 '--restore': './3_zinc.pickle'}
print(generate_from_model(args))