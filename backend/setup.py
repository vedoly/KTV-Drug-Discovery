from setuptools import setup

setup(name='OpenNMT-py',
      description='A python implementation of OpenNMT',
      version='0.4.1',

      packages=['onmt', 'onmt.encoders', 'onmt.modules', 'onmt.tests',
                'onmt.translate', 'onmt.decoders', 'onmt.inputters',
                'onmt.models', 'onmt.utils'])