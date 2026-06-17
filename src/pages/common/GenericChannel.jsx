import React from 'react';
import { useParams } from 'react-router-dom';
import DynamicChannel from '../../components/DynamicChannel';

export default function GenericChannel() {
  const { channelId } = useParams();
  
  const formattedName = channelId 
    ? channelId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Channel';

  return <DynamicChannel channelName={formattedName} subtitle={`#${channelId}`} />;
}
