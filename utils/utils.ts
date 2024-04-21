export const enumFromList = ( list : string[] ) => (
    Object.fromEntries(
        list.map(( key, index )=> [ key, index ] )
    )
); 