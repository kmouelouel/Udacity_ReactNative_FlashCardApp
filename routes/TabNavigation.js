// Tab Navigation 
import { Platform } from 'react-native'
import { TabNavigator } from 'react-navigation'
import DefaultView from '../components/DefaultView'
import NewDeckView from '../components/NewDeckView'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { blue, white} from '../utils/colors'
export const tabNavigator = TabNavigator({
        Home: {
            screen: DefaultView,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-bookmarks ' : 'md-bookmarks'} size={30} color={tintColor} />
            },
        },
        AddDeck: {
            screen: NewDeckView,
            navigationOptions: {
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
            },
        }
    }, {
            navigationOptions: {
                header: null
            },
            tabBarOptions: {
                activeTintColor: Platform.OS === 'ios' ? blue : white,
                style: {
                    height: 56,
                    backgroundColor: Platform.OS === 'ios' ? white : blue,
                    shadowColor: 'rgba(0, 0, 0, 0.24)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 6,
                    shadowOpacity: 1
                }
            }
        })

