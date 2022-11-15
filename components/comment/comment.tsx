import {createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    },

    body: {
        paddingLeft: 54,
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));

interface Props {
    postedAt: string;
    comment: string;
    userName: string;
    imageUrl: string;
}

export function Comment({postedAt, comment, userName, imageUrl}: Props) {
    const {classes} = useStyles();
    return (
        <Paper withBorder radius="md" className={classes.comment}>
            <Group>
                <Avatar src={imageUrl} alt={userName} radius="xl"/>
                <div>
                    <Text size="sm">{userName}</Text>
                    <Text size="xs" color="dimmed">
                        {postedAt}
                    </Text>
                </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
                <div className={classes.content} dangerouslySetInnerHTML={{__html: comment}}/>
            </TypographyStylesProvider>
        </Paper>
    );
}
