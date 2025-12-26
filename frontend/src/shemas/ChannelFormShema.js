import * as yup from 'yup';

const ChannelSchema = (existingNames) => yup.object({
  name: yup
    .string()
    .min(3, 'modals.channel_min')
    .max(20, 'modals.channel_max')
    .notOneOf(existingNames, 'modals.channel_exists')
    .trim()
});

export default ChannelSchema;
