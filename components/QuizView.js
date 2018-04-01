import React from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text } from 'react-native';
import { setLocalNotification, clearLocalNotification,capitalize } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import { lightRed, white, lightBlue, blue, lightPurp } from '../utils/colors'
import TextButton from './TextButton'
 

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

                
                {finishedQuiz ?
                    <View>
                        <View style={[styles.nums, { alignItems: 'center' }]}>
                            <Text style={{ fontSize: 20 }}>Correct: {correctNum}</Text>
                            <Text style={{ fontSize: 20, color: '#e74c3c' }}>Incorrect: {deck.questions.length - correctNum}</Text>
                        </View>
                        <View style={styles.button}> 
                            <TextButton style={{ backgroundColor: lightBlue, }} onPress={this.retest} >
                                retest
                            </TextButton>
                        </View>
                        <View style={styles.button}>
                            <TextButton style={{ backgroundColor: lightPurp,}} onPress={this.back} >
                                go back
                            </TextButton> 
                        </View>
                    </View>
                    :
                    <View>
                        <View style={{ margin: 20 }}>
                            <Text style={{ fontSize: 20 }}>{currentQuestion + 1} / {deck.questions.length}</Text>
                       </View>

                       {showAnswer ?
                            <Text style={[styles.cardFont, styles.card]}>{deck.questions[currentQuestion].answer}</Text>
                                :
                            <Text style={[styles.cardFont, styles.card]}>{deck.questions[currentQuestion].question}</Text>
                        }
                     
                     
                       <View style={styles.button}>
                            <TextButton style={{ backgroundColor: 'transparent', color: lightBlue, }} onPress={this.toggleAnswer}>
                                {showAnswer ? 'show Question' : 'show Answer'}
                            </TextButton>
                       </View>
                       
                       <View style={styles.button}>
                        <TextButton style={{ backgroundColor: lightBlue, }} onPress={() => this.nextQuestion(true)} >
                               correct 
                            </TextButton>
                            
                        </View>
                       <View style={styles.button}>
                            <TextButton style={{ backgroundColor: lightRed, }} onPress={() => this.nextQuestion(false)} >
                                incorrect 
                            </TextButton>
                           
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
        alignItems: 'center', 
    },
    card: {
        justifyContent: 'center',
        alignItems: 'stretch',
        width: 300,
        height: 200,
        marginTop: 30,
        marginBottom: 10,
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
    button: {
        margin: 10,
        paddingLeft: 80,
        paddingRight: 80
    } 
});
