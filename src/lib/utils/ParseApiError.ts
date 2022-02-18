export function ParseApiError(error: Error): string {
    let err = error.message.replace(/\d+:/gm, '');
    err = JSON.parse(err);

    // @ts-ignore
    return err.message;
}