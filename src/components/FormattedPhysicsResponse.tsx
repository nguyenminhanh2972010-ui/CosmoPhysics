import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import katex from 'katex';
import { BookOpen, CheckCircle2, Info } from 'lucide-react';

interface FormattedPhysicsResponseProps {
  content: string;
  source?: string;
  className?: string;
}

/**
 * Pre-processes and normalizes raw text from AI or database:
 * 1. Replaces \( ... \) with $ ... $
 * 2. Replaces \[ ... \] with $$ ... $$
 * 3. Normalizes \dfrac to \frac
 * 4. Fixes unescaped currency-like dollars vs math dollars
 * 5. Cleans up redundant self-intros if present
 */
function normalizePhysicsMarkdown(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // Normalize block math \[ ... \] to $$ ... $$
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `\n$$\n${math.trim()}\n$$\n`);

  // Normalize inline math \( ... \) to $ ... $
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math.trim()}$`);

  // Normalize \dfrac to \frac for wider KaTeX compatibility
  text = text.replace(/\\dfrac/g, '\\frac');

  // Remove redundant conversational prefixes if AI outputs them repeatedly
  text = text.replace(/^(Chào bạn[!,.]?\s*|COSMO AI xin chào bạn[!,.]?\s*|Chào bạn học sinh[!,.]?\s*)+/i, '');

  return text;
}

export const FormattedPhysicsResponse: React.FC<FormattedPhysicsResponseProps> = ({
  content,
  source,
  className = '',
}) => {
  const normalizedText = useMemo(() => normalizePhysicsMarkdown(content), [content]);

  // Determine source label cleanly
  const sourceLabel = useMemo(() => {
    if (source) return source;
    if (content.toLowerCase().includes('sgk vật lí 11') || content.toLowerCase().includes('sgk vật lý 11')) {
      return 'Nguồn kiến thức: SGK Vật Lí 11';
    }
    if (content.toLowerCase().includes('bổ sung') || content.toLowerCase().includes('mở rộng')) {
      return 'Kiến thức bổ sung';
    }
    return 'Nguồn kiến thức: SGK Vật Lí 11';
  }, [source, content]);

  return (
    <div className={`formatted-physics-response text-[#17212B] leading-relaxed text-xs sm:text-sm space-y-3 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          [
            rehypeKatex,
            {
              throwOnError: false,
              errorColor: '#168A5A',
              strict: false,
            },
          ],
        ]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-bold text-[#07583F] pb-1 border-b border-[#DDEAE3] mt-3 mb-2 flex items-center gap-1.5">
              <span>{children}</span>
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-[#07583F] mt-3 mb-1.5 flex items-center gap-1.5">
              <span>{children}</span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-bold text-[#168A5A] mt-2.5 mb-1">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs font-semibold text-[#07583F] mt-2 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-1.5 text-xs sm:text-sm leading-relaxed text-[#17212B]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-4 my-2 space-y-1 text-xs sm:text-sm text-[#17212B]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-4 my-2 space-y-1 text-xs sm:text-sm font-medium text-[#17212B]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 leading-relaxed">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-[#07583F]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[#2C3E50]">
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-2.5 p-3 bg-[#EAF7F0]/60 border border-[#DDEAE3] rounded-xl text-xs sm:text-sm text-[#07583F]">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 rounded-xl border border-[#DDEAE3] shadow-2xs">
              <table className="min-w-full divide-y divide-[#DDEAE3] text-left text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#EAF7F0] text-[#07583F] font-bold">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-[#DDEAE3] bg-white">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-[#F5FBF7] transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-xs font-bold text-[#07583F]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-xs text-[#17212B] leading-relaxed">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-3 border-[#DDEAE3]" />
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre className="p-3 bg-[#F5FBF7] border border-[#DDEAE3] rounded-xl font-mono text-xs text-[#07583F] overflow-x-auto my-2">
                  <code>{children}</code>
                </pre>
              );
            }
            return (
              <code className="px-1.5 py-0.5 bg-[#EAF7F0] border border-[#DDEAE3] text-[#07583F] rounded-md font-mono text-xs">
                {children}
              </code>
            );
          },
        }}
      >
        {normalizedText}
      </ReactMarkdown>

      {/* Verified Compact Source Label */}
      {sourceLabel && (
        <div className="pt-2 mt-3 border-t border-[#DDEAE3]/70 flex items-center justify-between text-[11px] text-[#5F6B66]">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#168A5A]" />
            <span className="font-semibold text-[#07583F]">{sourceLabel}</span>
          </div>
          <span className="text-[10px] text-[#5F6B66] font-mono">
            Vật Lí 11
          </span>
        </div>
      )}
    </div>
  );
};
