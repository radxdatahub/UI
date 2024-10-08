/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Circle Check Icon
 * @property {String} width - Determines width of icon for sizing purposes
 * @property {String} height - Determines height of icon for sizing purposes
 * @returns {JSX} Circle Check Icon
 */

const CircleCheckIcon = ({ width, height }) => {
    width = width || '24';
    height = height || '24';
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2634_2066)">
                <path
                    d="M12 2.25C14.5859 2.25 17.0658 3.27723 18.8943 5.10571C20.7228 6.93419 21.75 9.41414 21.75 12C21.75 14.5859 20.7228 17.0658 18.8943 18.8943C17.0658 20.7228 14.5859 21.75 12 21.75C9.41414 21.75 6.93419 20.7228 5.10571 18.8943C3.27723 17.0658 2.25 14.5859 2.25 12C2.25 9.41414 3.27723 6.93419 5.10571 5.10571C6.93419 3.27723 9.41414 2.25 12 2.25ZM12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM17.2969 9.79688C17.7375 9.35625 17.7375 8.64375 17.2969 8.20781C16.8563 7.77188 16.1438 7.76719 15.7078 8.20781L10.5047 13.4109L8.30156 11.2078C7.86094 10.7672 7.14844 10.7672 6.7125 11.2078C6.27656 11.6484 6.27187 12.3609 6.7125 12.7969L9.7125 15.7969C10.1531 16.2375 10.8656 16.2375 11.3016 15.7969L17.2969 9.79688Z"
                    fill="#18AD00"
                />
            </g>
            <defs>
                <clipPath id="clip0_2634_2066">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

CircleCheckIcon.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
};

export default CircleCheckIcon;
