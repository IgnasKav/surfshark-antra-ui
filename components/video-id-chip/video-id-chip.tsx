import {TextInputProps} from '@mantine/core';
import { IconX } from '@tabler/icons';
import css from './video-id-chip.module.scss';
interface Props {
    videoId: string;
    handleDelete: (videoId: string) => void;
    props?: TextInputProps
}


export default function VideoIdChip({handleDelete, videoId, props}: Props) {
    return(
        <div {...props} className={css.badge}>
            <div>
                {videoId}
            </div>
            <IconX className={css.closeIcon} size={14} onClick={() => handleDelete(videoId)}/>
        </div>);
}
