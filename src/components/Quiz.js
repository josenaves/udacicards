import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { observer, inject } from 'mobx-react';
import TextButton from './TextButton';
import { white } from '../colors';
import { clearLocalNotification, setLocalNotification } from '../helpers/notificationHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cardContainer: {
    flex: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  buttonsContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    fontSize: 25,
    width: 200,
    padding: 15,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  buttonAnswer: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  buttonGreen: {
    borderColor: 'green',
    backgroundColor: 'green',
    color: white,
  },
  buttonRed: {
    marginTop: 30,
    borderColor: 'red',
    backgroundColor: 'red',
    color: white,
  },
});

const Progress = (props) => {
  const { current, total } = props;
  return (
    <Text>
      {current} / {total}
    </Text>
  );
};

@inject('store')
@observer
export default class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      totalIncorrect: 0,
      totalCorrect: 0,
      showQuestion: true,
      quizFinished: false,
    };
  }

  async componentDidMount() {
    await clearLocalNotification();
    await setLocalNotification();
  }

  toggleCard = () => {
    this.setState(state => ({ showQuestion: !state.showQuestion }));
  };

  markCorrect = () => {
    const { deck } = this.props.navigation.state.params;
    const { store } = this.props;
    if (this.state.currentCard + 1 === store.decks[deck].questions.length) {
      this.setState(state => ({
        quizFinished: true,
        totalCorrect: state.totalCorrect + 1,
      }));
    } else {
      this.setState(state => ({
        showQuestion: true,
        totalCorrect: state.totalCorrect + 1,
        currentCard: state.currentCard + 1,
      }));
    }
  };

  markIncorrect = () => {
    const { deck } = this.props.navigation.state.params;
    const { store } = this.props;
    if (this.state.currentCard + 1 === store.decks[deck].questions.length) {
      this.setState(state => ({
        quizFinished: true,
        totalIncorrect: state.totalIncorrect + 1,
      }));
    } else {
      this.setState(state => ({
        showQuestion: true,
        totalIncorrect: state.totalIncorrect + 1,
        currentCard: state.currentCard + 1,
      }));
    }
  };

  restartQuiz = () => {
    this.setState({
      currentCard: 0,
      totalIncorrect: 0,
      totalCorrect: 0,
      showQuestion: true,
      quizFinished: false,
    });
  };

  render() {
    const { deck } = this.props.navigation.state.params;
    const { store } = this.props;
    const total = store.decks[deck].questions.length;
    const { question, answer } = store.decks[deck].questions[this.state.currentCard];

    let content;
    if (this.state.quizFinished) {
      content = (
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Quiz finished</Text>
          <Text style={styles.subTitle}>Correct answers: {this.state.totalCorrect}</Text>
          <Text style={styles.subTitle}>Incorrect answers: {this.state.totalIncorrect}</Text>
        </View>
      );
    } else {
      content = (
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{this.state.showQuestion ? question : answer}</Text>
          <TextButton style={styles.buttonAnswer} onPress={this.toggleCard}>
            {this.state.showQuestion ? 'Answer' : 'Question'}
          </TextButton>
        </View>
      );
    }

    let buttons;
    if (this.state.quizFinished) {
      buttons = (
        <View style={styles.buttonsContainer}>
          <TextButton style={[styles.button, styles.buttonGreen]} onPress={this.restartQuiz}>
            Restart quiz
          </TextButton>
          <TextButton
            style={[styles.button, styles.buttonRed]}
            onPress={() => this.props.navigation.goBack()}
          >
            Back
          </TextButton>
        </View>
      );
    } else {
      buttons = (
        <View style={styles.buttonsContainer}>
          <TextButton style={[styles.button, styles.buttonGreen]} onPress={this.markCorrect}>
            Correct
          </TextButton>
          <TextButton style={[styles.button, styles.buttonRed]} onPress={this.markIncorrect}>
            Incorrect
          </TextButton>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer}>
          <Progress current={this.state.currentCard + 1} total={total} />
        </View>
        {content}
        {buttons}
      </ScrollView>
    );
  }
}
