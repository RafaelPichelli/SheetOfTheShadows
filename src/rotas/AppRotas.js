import Stats from "../telas/stats";
import Combate from "../telas/combate";
import Magia from "../telas/magia"
import Inventario from "../telas/inventario";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {NavigationContainer} from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export default function AppRotas() {
    return <NavigationContainer >
        <Tab.Navigator  initialRouteName={Stats}>
            <Tab.Screen name="Atributos" component={Stats} />
            <Tab.Screen name="Combate" component={Combate}/>
            <Tab.Screen name="Magias" component={Magia}/>
            <Tab.Screen name="Inventario" component={Inventario} />
        </Tab.Navigator>
    </NavigationContainer>
}
