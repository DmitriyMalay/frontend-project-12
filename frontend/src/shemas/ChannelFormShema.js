import * as yup from 'yup';
import { hasProfanity } from './profanityFilter';


const ChannelSchema = (existingNames) => yup.object({
  name: yup
    .string()
    .min(3, 'modals.channel_min')
    .max(20, 'modals.channel_max')
    .notOneOf(existingNames, 'modals.channel_exists')
    .trim()
    .test('profanity', 'Использование нецензурных слов', (value) => !hasProfanity(value)),
});

export default ChannelSchema;
