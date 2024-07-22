export default function Loading() {
  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60">
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-indigo-400"></div>
    </div>
  );
}
