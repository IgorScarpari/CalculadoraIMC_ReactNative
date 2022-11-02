import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import image from './assets/imc_title.jpg';

import { TextInput, Button } from 'react-native-paper';

export default class App extends React.Component {

  // valores globais do app
  state = {
    weight: 0,
    height: 0,
    imc: 0,
    text: 'Indeterminado',
    cor: '#008B8B',
  };

  checkIMC = () => {

    let value = 0;

    if (this.state.weight != "" && this.state.height != "") {
      value = this.calcIMC();
    }

    this.setState({
      imc: value
    });

    if (value > 0 && value < 17.1) {
      this.setState({
        text: 'Muito abaixo do peso.',
        cor: '#00FA9A'
      });
    } else if (value >= 17.1 && value < 18.5) {
      this.setState({
        text: 'Abaixo do peso.',
        cor: '#90EE90	'
      });
    } else if (value >= 18.5 && value < 25) {
      this.setState({
        text: 'Peso normal.',
        cor: '#BDB76B'
      });
    } else if (value >= 25 && value < 30) {
      this.setState({
        text: 'Acima do peso.',
        cor: '#FF6347'
      });
    } else if (value >= 30 && value < 35) {
      this.setState({
        text: 'Obesidade I.',
        cor: '#FF0000'
      });
    } else if (value >= 35 && value < 40) {
      this.setState({
        text: 'Obesidade II(severa).',
        cor: '#B22222'
      });
    } else if (value >= 40) {
      this.setState({
        text: 'Obesidade III(mórbida).',
        cor: '#800000'
      });
    }
    else {
      this.setState({
        text: 'Indeterminado',
        cor: '#008B8B',
      });
    }
  }

  calcIMC() {
    return (this.state.weight / (this.state.height * this.state.height)).toFixed(2);
  }

  render() {
    return (
      <View style={styles.app}>

        <Text style={styles.text}>CALCULADORA IMC</Text>

        <View style={styles.container}>
          <Image source={image} style={{ width: 400, height: 300 }} />
        </View>

        <View>
          <TextInput
            style={styles.weight}
            label="Digite o seu peso em Kg:"
            keyboardType="numeric"
            onChangeText={typedValue => {
              this.setState({ weight: typedValue.replace(',', '.') });
            }}
          />
          <TextInput
            style={styles.height}
            label="Digite a sua altura em metros:"
            keyboardType="numeric"
            onChangeText={(typedValue) => {
              this.setState({ height: typedValue.replace(',', '.') });
            }}
          />
          <Button style={styles.button} mode="contained" onPress={this.checkIMC}>
            Calcular
          </Button>
        </View>

        <Text style={styles.text}>RESULTADO IMC</Text>

        <View style={[styles.panel, { backgroundColor: this.state.cor }]}>
          <Text style={styles.value}>{this.state.imc}</Text>
          <Text style={styles.result}>{this.state.text}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    padding: 10,
    backgroundColor: '#00FFFF'
  },
  panel: {
    alignSelf: 'center',
    borderRadius: 5,
    width: 350,
    marginVertical: 10,
    padding: 8,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    marginTop: 8,
    padding: 8,
  },
  value: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  result: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  weight: {
    marginTop: 8,
    marginVertical: 10,
    fontSize: 20,
    backgroundColor: '#008B8B',
    fontcolor: 'white'
  },
  height: {
    marginTop: 8,
    marginVertical: 10,
    fontSize: 20,
    backgroundColor: '#008B8B',
    color: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 155,
  },
  button: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: '#008B8B',
    color: 'white'
  },
});
