import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from "react-native-view-shot"
import * as FileSystem from 'expo-file-system'
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
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }:Props) {

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const [screenShot, setScreenShot] = useState<string | null>(null)

  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false)

  const [comment, setComment] = useState('')

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

    async function handleSendFeedback(){
        if(isSendingFeedback){
            return;
        }

        setIsSendingFeedback(true)
        const screenshotBase64 = screenShot && await FileSystem.readAsStringAsync(screenShot, { encoding: 'base64' })

        try {
            await api.post("/feedbacks", {
                type: feedbackType,
                screenShot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            })

            onFeedbackSent()

        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false)
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
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
            autoCorrect={false}
            onChangeText={setComment}
        />

        <View style={styles.footer}>
            <Screenshot 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenShotRemove}
                screenshot={screenShot}
            />
            <Button 
                onPress={handleSendFeedback}
                isLoading={isSendingFeedback}
            />
        </View>
    </View>
  );
}