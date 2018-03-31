import React from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text } from 'react-native';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import { red, white, lightBlue, lightPurp } from '../utils/colors'

export default class QuizView extends React.Component {

    state = {
            correctNum: 0,
            currentQuestion: 0,
            showAnswer: false,
            finish: false
        };
   

    toggleAnswer = () => {
        this.setState({
            showAnswer: !this.state.showAnswer
        });
    }

    retest = () => {
        this.setState({
            correctNum: 0,
            currentQuestion: 0,
            showAnswer: false,
            finishedQuiz: false
        });
    }

    back = () => {
        const { navigation } = this.props;
        navigation.dispatch(NavigationActions.back());
    }

    nextQuestion = (isTrue) => {
        const { deck } = this.props.navigation.state.params;
        this.setState(prevState => {
            // if finish test
            if (prevState.currentQuestion + 1 === deck.questions.length) {
                // clear local notification and set one for tomorrow 
                clearLocalNotification().then(setLocalNotification())

                return {
                    finishedQuiz: true,
                    correctNum: isTrue ? prevState.correctNum + 1 : prevState.correctNum,
                    showAnswer: false
                }
            }
            // if not finish yet.
            return {
                currentQuestion: prevState.currentQuestion + 1,
                correctNum: isTrue ? prevState.correctNum + 1 : prevState.correctNum,
                showAnswer: false
            }
        });
    }

    render() {

        const { deck } = this.props.navigation.state.params;
        const { finishedQuiz, correctNum, currentQuestion, showAnswer } = this.state;

        return (
            <View style={styles.container}>

                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 20 }}>{currentQuestion + 1} / {deck.questions.length}</Text>
                </View>

                {finishedQuiz ?
                    <View>
                        <View style={[styles.nums, { alignItems: 'center' }]}>
                            <Text style={{ fontSize: 20 }}>Correct: {correctNum}</Text>
                            <Text style={{ fontSize: 20, color: '#e74c3c' }}>Incorrect: {deck.questions.length - correctNum}</Text>
                        </View>
                        <View style={styles.button}>
                            <Button title='retest' onPress={this.retest} />
                        </View>
                        <View style={styles.button}>
                            <Button title='go back' onPress={this.back} />
                        </View>
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={this.toggleAnswer} style={[styles.card, showAnswer ? styles.answerCard : null]}>
                            {showAnswer ?
                                <Text style={styles.cardFont}>{deck.questions[currentQuestion].answer}</Text>
                                :
                                <Text style={styles.cardFont}>{deck.questions[currentQuestion].question}</Text>
                            }
                        </TouchableOpacity>

                        <View style={styles.button}>
                            <Button title='correct' onPress={() => this.nextQuestion(true)} />
                        </View>
                        <View style={styles.button}>
                            <Button color='#e74c3c' title='incorrect' onPress={() => this.nextQuestion(false)} />
                        </View>

                    </View>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    card: {
        justifyContent: 'center',
        alignItems: 'stretch',
        width: 300,
        height: 200,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: lightBlue,
    },
    answerCard: {
        backgroundColor: lightPurp,
    },
    cardFont: {
        color: white,
        padding: 30,
        fontSize: 16
    },
    next: {
        alignSelf: 'center',
        margin: 20
    },
    button: {
        margin: 10,
        paddingLeft: 80,
        paddingRight: 80
    }
});
