import { StackNavigator } from 'react-navigation' 
import IndividualDeckView from '../components/IndividualDeckView'
import NewQuestionView from '../components/NewQuestionView'
import QuizView from '../components/QuizView'
import { white, blue } from '../utils/colors'
import { Platform } from 'react-native'
import { tabNavigator } from './TabNavigation' 
import { Ionicons, FontAwesome } from '@expo/vector-icons'

 

export default MainNavigator  = StackNavigator({
    Home: {
        screen: tabNavigator,
    },
    IndividualDeckView: {
        screen: IndividualDeckView, 
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue,
            }
        }
    },
    NewQuestionView: {
        screen: NewQuestionView,
        navigationOptions: {
            headerTitle: 'Add Card', 
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue,
            }
        }
        
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            headerTitle: 'Quiz',  
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue,
            }
        }
       
    } 
})
 
