export default () => (
    {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database: {
        host: process.env.HOST,
        port: parseInt(process.env.DATABASE, 10) || 5432
    }
});

