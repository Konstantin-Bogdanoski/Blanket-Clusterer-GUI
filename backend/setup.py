from setuptools import setup, find_packages

requires = [
    'flask',
    'flask-cors',
    'scikit-learn',
    'gensim',
    'rake_nltk'
]

setup(
    name='backend',
    version='0.0',
    description='Generic Clustering Application',
    author='Konstantin Bogdanoski',
    author_email='konstantin.b@live.com',
    keywords='web flask finki fcse Konstantin-Bogdanoski',
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires
)
