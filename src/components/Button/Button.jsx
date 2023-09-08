import { StyleButton } from "./Button.styled"

export const ButtonLoadMore = ({loadMore}) => {
    return (
        <StyleButton className="load more" type="button" onClick={loadMore}>Load more</StyleButton>
    )
}