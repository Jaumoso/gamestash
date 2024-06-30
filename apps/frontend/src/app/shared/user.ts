interface LibraryItem {
    gameId: number | undefined;
    name: string | undefined;
    releaseDate: Date | undefined;
    cover: string | undefined;
    rating: number | undefined;
    platforms: string[] | undefined;
    storefronts: string[] | undefined;
    acquisitionDate: Date | undefined;
    acquisitionPrice: number | undefined;
    own: boolean | undefined;
    format: string | undefined;
    state: string | undefined;
    time: number | undefined;
    comment: string | undefined;
}

export class User{
    _id: string | undefined;
    password: string | undefined;
    username: string | undefined;
    joined: Date | undefined;
    lastSeen: Date | undefined;
    library: LibraryItem[] = [];
}