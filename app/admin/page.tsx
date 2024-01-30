export default function AboutPage() {
    return (
        <div className="flex w-full h-full gap-4 rounded-lg">
            <div className="w-2/3 h-full p-4 bg-slate-700 rounded-lg">
                <h2 className="text-2xl text-white">Ordenes</h2>
            </div>
            <div className="flex flex-col w-1/3 h-full gap-4 rounded-lg">
                <div className="w-full h-2/3 bg-slate-700 rounded-lg"></div>
                <div className="w-full h-1/3 bg-slate-700 rounded-lg"></div>
            </div>
        </div>
    );
}
