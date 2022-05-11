import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from "react-native-view-shot"
import React, {useState} from 'react';
import { 
    View,
    TextInput,
    Image,
    Text, 
    TouchableOpacity 
} from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

import {FeedbackType} from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Screenshot } from '../Screenshot';
import { Button } from '../Button';

interface Props {
    feedbackType: FeedbackType
}

export function Form({ feedbackType }:Props) {

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const [screenShot, setScreenShot] = useState<string | null>(null)

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => setScreenShot(uri))
        .catch(error => console.log(error))
    }

    function handleScreenShotRemove(){
        setScreenShot(null)
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image 
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>

        <TextInput 
            multiline
            style={styles.input}
            placeholder="Algo nao esta funcionando bem? digite seu problema"
            placeholderTextColor={theme.colors.text_secondary}
        />

        <View style={styles.footer}>
            <Screenshot 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenShotRemove}
                screenshot={screenShot}
            />
            <Button isLoading={false}/>
        </View>
    </View>
  );
}