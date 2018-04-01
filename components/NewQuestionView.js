import React from 'react';
import { StyleSheet, Keyboard, View, Button, Text, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions/index';
import { NavigationActions } from 'react-navigation';
import * as API from '../utils/api';
import TextButton from './TextButton';
import { lightBlue } from '../utils/colors'

class NewQuestionView extends React.Component {
 state = {
            question: '',
            answer: ''
      
    }
 componentWillReceiveProps(nextProps) {
     if (nextProps.deck != this.props.deck) {
         this.props.navigation.setParams({ deck: nextProps.deck });
     }
 }
    submit = () => {

        const { navigation, dispatch } = this.props;
        const { deck } = navigation.state.params;
        let { question, answer } = this.state;

        if (!question.trim() || !answer.trim()) {
            Alert.alert('ERROR', 'The question and answer can not be null string!');
            return;
        }

        question = question.trim();
        answer = answer.trim();

        const newDeck = {
            [deck.title]: {
                title: deck.title,
                questions: [...deck.questions, { question, answer }]
            }
        };

        Keyboard.dismiss();
        dispatch(addCard(newDeck));
        API.addNewCard(newDeck);
        navigation.dispatch(NavigationActions.back());
    }

    onQchange = (question) => {
        this.setState({ question });
    }

    onAchange = (answer) => {
        this.setState({ answer });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                <TextInput style={styles.input} placeholder="Question" onChangeText={this.onQchange} />
                <TextInput style={styles.input} placeholder="Answer" onChangeText={this.onAchange} />
                <View style={styles.button}> 
                    <TextButton style={{ backgroundColor: lightBlue, }} onPress={this.submit} >
                        Submit
                   </TextButton>
                </View>
            </KeyboardAvoidingView>
        );
    }

};

const styles = StyleSheet.create({
    input: {
        padding: 15, 
        fontSize: 20, 
        marginTop: 20,
    },
    button: {
        margin: 5,
        padding: 5,
        alignItems: 'center'
    }
});

export default connect()(NewQuestionView);