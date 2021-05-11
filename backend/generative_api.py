import Flask

@app.route('/generate',methods=['POST'])

def generate():
    model_type = request.json['model_type']
    return model_type