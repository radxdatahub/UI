import React from 'react';
import Footer from './Footer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Footer',
    component: Footer,
    parameters: {
        backgrounds: {
            default: 'light grey',
            values: [
                { name: 'light grey', value: '#E9E9E9' },
                { name: 'white', value: '#F0F0F0' },
            ],
        },
    },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <Footer {...args} />;

export const Base = Template.bind({});
Base.args = {};
