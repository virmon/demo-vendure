import { defineDashboardExtension } from '@vendure/dashboard';

defineDashboardExtension({
    login: {
        logo: {
            component: () => <img src="../../static/assets/preview/00/nikolai-chernichenko-1299748-unsplash__preview.jpg" alt="La Maison Mahal" width={200} height={100} className="h-6 w-auto dark:invert" />,
        },
        beforeForm: {
            component: () => <div className="text-muted-foreground">Welcome to La Maison Mahal</div>,
        },
    },
});