import React from 'react';

interface TelegramIconProps {
  className?: string;
}

const TelegramIcon: React.FC<TelegramIconProps> = ({ className }) => (
  <svg width="16" className={className} height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.9729 1.18349L13.0589 13.9121C12.9218 14.5116 12.2875 14.8205 11.7676 14.5358L8.08209 12.5194L6.33942 15.541C5.86525 16.3646 4.66538 16.0074 4.66538 15.0444V11.6775C4.66538 11.4172 4.76818 11.1689 4.94533 10.9872L12.1276 3.72063C12.1218 3.6298 12.0304 3.55114 11.9391 3.61763L3.36857 9.93957L0.48891 8.36514C-0.185238 7.99572 -0.156669 6.9602 0.540307 6.63933L14.7389 0.0813994C15.4188 -0.233542 16.1503 0.414452 15.9731 1.18343L15.9729 1.18349Z" />
  </svg>
);

export default TelegramIcon;
