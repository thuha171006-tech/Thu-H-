/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Palette, Layers, Box } from 'lucide-react';
import { POTTERY_OPTIONS, FLOWER_OPTIONS } from '../data';
import { PotteryCustomSelection, FlowerCustomSelection, WorkshopType } from '../types';

interface InteractiveVisualizerProps {
  workshopType: WorkshopType;
  potterySelection: PotteryCustomSelection;
  flowerSelection: FlowerCustomSelection;
  onUpdatePottery: (v: Partial<PotteryCustomSelection>) => void;
  onUpdateFlower: (v: Partial<FlowerCustomSelection>) => void;
}

export default function InteractiveVisualizer({
  workshopType,
  potterySelection,
  flowerSelection,
  onUpdatePottery,
  onUpdateFlower,
}: InteractiveVisualizerProps) {
  const isPottery = workshopType === 'pottery';

  // Find active option details to render dynamic texts
  const currentClay = POTTERY_OPTIONS.clays.find((c) => c.name === potterySelection.clayType) || POTTERY_OPTIONS.clays[0];
  const currentGlaze = POTTERY_OPTIONS.glazes.find((g) => g.name === potterySelection.glazeType) || POTTERY_OPTIONS.glazes[0];
  const currentShape = POTTERY_OPTIONS.shapes.find((s) => s.name === potterySelection.shapeType) || POTTERY_OPTIONS.shapes[0];

  const currentPalette = FLOWER_OPTIONS.palettes.find((p) => p.name === flowerSelection.colorPalette) || FLOWER_OPTIONS.palettes[1];
  const currentStyle = FLOWER_OPTIONS.styles.find((s) => s.name === flowerSelection.styleType) || FLOWER_OPTIONS.styles[0];
  const currentVase = FLOWER_OPTIONS.vases.find((v) => v.name === flowerSelection.vaseType) || FLOWER_OPTIONS.vases[1];

  // Helper reset options
  const handleReset = () => {
    if (isPottery) {
      onUpdatePottery({
        clayType: POTTERY_OPTIONS.clays[0].name,
        glazeType: POTTERY_OPTIONS.glazes[0].name,
        shapeType: POTTERY_OPTIONS.shapes[0].name,
      });
    } else {
      onUpdateFlower({
        colorPalette: FLOWER_OPTIONS.palettes[1].name,
        styleType: FLOWER_OPTIONS.styles[0].name,
        vaseType: FLOWER_OPTIONS.vases[1].name,
      });
    }
  };

  return (
    <section id="customizer-section" className="py-16 bg-[#FAF7F2] border-t border-b border-[#EBE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3" id="customizer-header">
          <div className="inline-flex items-center gap-1 bg-[#EBE3D5] px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#5C4A3C]">
            <Sparkles className="w-3 h-3 text-[#8C624E]" /> Studio Playground
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2522]">
            Phác Thảo <span className="text-[#8C624E] italic font-normal">Ý Tưởng Tác Phẩm</span>
          </h2>
          <p className="text-xs text-[#7A6C65] font-sans">
            Thử nghiệm phối trộn nguyên liệu mộc và phối màu nghệ thuật ngay trước khi bắt đầu buổi học thực tế.
          </p>
        </div>

        {/* Customizer Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="customizer-playground-grid">
          
          {/* LEFT: Live Visual Display (Dynamic CSS Graphic Canvas) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#EDEAE4] p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[420px] lg:min-h-auto">
            
            {/* Elegant Background Grid Line Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#F2ECE4_1px,transparent_1px),linear-gradient(to_bottom,#F2ECE4_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

            {/* Title / Reset control */}
            <div className="flex justify-between items-center z-10" id="visualizer-actions">
              <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">Preview Mockup</span>
              <button
                id="btn-reset-customizer"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-[#8C624E] hover:text-[#6E4B3B] font-medium transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Thiết Kế
              </button>
            </div>

            {/* ART CANVAS REPRESENTATION */}
            <div className="flex-1 flex flex-col items-center justify-center relative py-10 z-10" id="visualizer-artwork-canvas">
              <AnimatePresence mode="wait">
                {isPottery ? (
                  /* Pottery CSS Mockup representation */
                  <motion.div
                    key={`pottery-artwork-${currentShape.id}-${currentGlaze.id}-${currentClay.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="flex flex-col items-center justify-center relative w-64 h-64"
                    id="pottery-canvas-graphic"
                  >
                    {/* Shadow underneath */}
                    <div className="absolute bottom-6 w-36 h-3 bg-black/10 rounded-full blur-sm"></div>

                    {/* Pottery Shape Container */}
                    <div className="relative flex flex-col items-center justify-end w-full h-full pb-8">
                      {/* 1. Classic Vessel Shape Drawing (Pure styled CSS) */}
                      {currentShape.id === 'classic_vase' && (
                        <div className="flex flex-col items-center w-full">
                          {/* Vase Opening */}
                          <div
                            className="w-16 h-4 rounded-full border border-black/5 opacity-80"
                            style={{
                              backgroundColor: currentGlaze.color,
                              boxShadow: 'inset 0 2px 2px rgba(0,0,0,0.1)'
                            }}
                          ></div>
                          {/* Vase neck */}
                          <div
                            className="w-12 h-10 border-l border-r border-black/5 transition-colors"
                            style={{ backgroundColor: currentGlaze.color }}
                          ></div>
                          {/* Vase main belly bowl */}
                          <div
                            className="w-40 h-40 rounded-[50%_50%_40%_40%] border border-black/5 relative shadow-md transition-colors"
                            style={{
                              backgroundColor: currentGlaze.color,
                              background: currentGlaze.id === 'speckled' 
                                ? `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${currentGlaze.color} 70%, #9F978F 100%)`
                                : `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${currentGlaze.color} 50%, rgba(0,0,0,0.08) 100%)`
                            }}
                          >
                            {/* Speckled dots mockup */}
                            {currentGlaze.id === 'speckled' && (
                              <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(#3c3532_1px,transparent_1px)] bg-[size:6px_6px] rounded-full"></div>
                            )}
                            
                            {/* Texture showing unglazed clay base foot rim */}
                            <div
                              className="absolute bottom-0 inset-x-9 h-3 rounded-b-md transition-colors"
                              style={{ backgroundColor: currentClay.color }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {currentShape.id === 'wave_plate' && (
                        <div className="flex flex-col items-center w-full">
                          {/* Wave plate ellipse view */}
                          <div
                            className="w-56 h-18 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] border-2 border-black/5 shadow-md relative transition-transform animate-pulse duration-200"
                            style={{
                              backgroundColor: currentGlaze.color,
                              background: `radial-gradient(ellipse at 50% 30%, #FFFFFF 0%, ${currentGlaze.color} 60%, rgba(0,0,0,0.15) 100%)`
                            }}
                          >
                            {/* Speckled pattern */}
                            {currentGlaze.id === 'speckled' && (
                              <div className="absolute inset-0 opacity-45 mix-blend-multiply bg-[radial-gradient(#3c3532_1px,transparent_1px)] bg-[size:7px_7px] rounded-full"></div>
                            )}

                            {/* Innermost base ring */}
                            <div className="absolute inset-x-12 inset-y-4 rounded-full border border-dashed border-[#8C624E]/20 flex items-center justify-center">
                              <span className="text-[9px] text-[#8C624E]/40 font-serif">handmade</span>
                            </div>

                            {/* Exposed clay rim profile */}
                            <div
                              className="absolute bottom-[-2px] inset-x-20 h-1.5 rounded-full transition-colors"
                              style={{ backgroundColor: currentClay.color }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {currentShape.id === 'zen_cup' && (
                        <div className="flex flex-col items-center w-full">
                          {/* Cup mouth */}
                          <div
                            className="w-32 h-6 rounded-full border border-black/5 z-20"
                            style={{
                              backgroundColor: currentGlaze.color,
                              boxShadow: 'inset 0 3px 3px rgba(0,0,0,0.1)'
                            }}
                          ></div>
                          {/* Cup Body bowl */}
                          <div
                            className="w-34 h-28 rounded-b-[45%] border-l border-r border-b border-black/5 relative shadow-md -mt-3 z-10 overflow-hidden"
                            style={{
                              backgroundColor: currentGlaze.color,
                              background: `linear-gradient(135deg, #FFFFFF 0%, ${currentGlaze.color} 60%, rgba(0,0,0,0.12) 100%)`
                            }}
                          >
                            {/* Speckled pattern */}
                            {currentGlaze.id === 'speckled' && (
                              <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(#3c3532_1px,transparent_1px)] bg-[size:5px_5px]"></div>
                            )}

                            {/* Natural clay handgrip bottom ring */}
                            <div
                              className="absolute bottom-0 inset-x-0 h-4 transition-colors border-t border-black/5"
                              style={{ backgroundColor: currentClay.color }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tag of components */}
                    <div className="absolute bottom-0 left-0 right-0 text-center text-xs" id="pottery-custom-tag">
                      <p className="font-serif font-bold text-[#5C4A3C]">{currentShape.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{currentClay.name} • {currentGlaze.name}</p>
                    </div>
                  </motion.div>
                ) : (
                  /* Flower CSS Abstract Bouquet representation */
                  <motion.div
                    key={`flower-artwork-${currentPalette.id}-${currentStyle.id}-${currentVase.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="flex flex-col items-center justify-center relative w-64 h-64"
                    id="flower-canvas-graphic"
                  >
                    {/* Floor reflection shadow */}
                    <div className="absolute bottom-4 w-24 h-2.5 bg-black/5 rounded-full blur-xs"></div>

                    {/* Composite layout container */}
                    <div className="relative flex flex-col items-center justify-end w-full h-full pb-6">
                      
                      {/* FLOWER PETALS FLOATING & ARRANGEMENT */}
                      <div className="absolute bottom-16 w-48 h-40 flex items-center justify-center z-10" id="floating-petals-box">
                        {/* Render different arrangements based on styling chosen */}
                        {currentStyle.id === 'french' && (
                          <div className="relative w-full h-full">
                            {/* Wide flowery cloud */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-16 rounded-full bg-sand-200/20 filter blur-xl"></div>
                            {/* Center Rose Blush 1 */}
                            <div className="absolute top-6 left-12 w-8 h-8 rounded-full shadow-xs border border-pink-200/50 flex items-center justify-center text-sm" style={{ backgroundColor: currentPalette.colors[0] }}>🌸</div>
                            {/* Rose 2 */}
                            <div className="absolute top-10 right-10 w-10 h-10 rounded-full shadow-xs border border-pink-100 flex items-center justify-center text-lg z-10" style={{ backgroundColor: currentPalette.colors[1] || '#FFFFFF' }}>🌹</div>
                            {/* Hydrangea Cloud White */}
                            <div className="absolute top-14 left-8 w-12 h-12 rounded-full shadow-xs flex items-center justify-center text-sm border" style={{ backgroundColor: '#FFFFFF', color: '#8C624E' }}>🤍</div>
                            {/* Tulip or Ranunculus */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full shadow-xs flex items-center justify-center text-md" style={{ backgroundColor: currentPalette.colors[2] || '#FCFAF7' }}>🌷</div>
                            {/* Side delicate leaf branching left */}
                            <div className="absolute top-8 -left-2 w-14 h-4 rounded-full bg-[#8EA99A]/40 border-l border-[#8EA99A] rotate-[-35deg] origin-right"></div>
                            {/* Side grass right */}
                            <div className="absolute top-8 -right-2 w-16 h-3 rounded-full bg-[#8EA99A]/30 border-r border-[#8EA99A] rotate-[25deg] origin-left"></div>
                          </div>
                        )}

                        {currentStyle.id === 'ikebana' && (
                          <div className="relative w-full h-full flex flex-col items-center justify-end">
                            {/* Strictly vertical dramatic stem branch */}
                            <div className="absolute bottom-0 w-1 h-32 bg-[#8C624E] rounded-full origin-bottom rotate-[-20deg]"></div>
                            <div className="absolute bottom-0 w-1 h-24 bg-[#8C624E]/80 rounded-full origin-bottom rotate-[35deg]"></div>
                            
                            {/* Single exquisite flower rose high up left side */}
                            <div className="absolute top-2 left-6 w-9 h-9 rounded-full border flex items-center justify-center text-md shadow-xs" style={{ backgroundColor: currentPalette.colors[0] }}>🌹</div>
                            {/* Secondary bud lower right */}
                            <div className="absolute top-14 right-10 w-7 h-7 rounded-full border flex items-center justify-center text-xs shadow-xs" style={{ backgroundColor: currentPalette.colors[1] || '#FFFFFF' }}>💮</div>
                            
                            {/* Minimal leaf support */}
                            <div className="absolute bottom-10 left-12 w-8 h-2.5 rounded-full bg-[#8EA99A]/60 rotate-[-15deg]"></div>
                          </div>
                        )}

                        {currentStyle.id === 'compact' && (
                          <div className="relative w-36 h-36 rounded-full border border-dashed border-pink-100 p-2 bg-pink-100/5 flex flex-wrap gap-1 items-center justify-center overflow-visible shadow-xs">
                            {/* Tight circular ball arrangement */}
                            <div className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-xs" style={{ backgroundColor: currentPalette.colors[0] }}>🌸</div>
                            <div className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-xs" style={{ backgroundColor: '#FFFFFF' }}>🤍</div>
                            <div className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-xs" style={{ backgroundColor: currentPalette.colors[1] || '#FFCFD2' }}>🌹</div>
                            <div className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-xs" style={{ backgroundColor: currentPalette.colors[2] || '#FFFFFF' }}>🌷</div>
                            <div className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-xs" style={{ backgroundColor: currentPalette.colors[0] }}>🌸</div>
                            <div className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-xs" style={{ backgroundColor: '#FFFFFF' }}>🤍</div>
                            {/* Miniature eucalyptus leaf sticking out */}
                            <div className="absolute bottom-4 -right-1.5 w-6 h-4 rounded-full bg-[#8EA99A]/50 rotate-[45deg]"></div>
                          </div>
                        )}
                      </div>

                      {/* THE SELECTED CONTAINER VASE DRAWING */}
                      {currentVase.id === 'terracotta_pot' && (
                        <div className="w-24 h-18 rounded-b-xl border border-black/5 z-20 relative flex flex-col justify-between overflow-hidden shadow-xs" style={{ backgroundColor: '#B37153' }}>
                          <div className="w-full h-2.5 border-b border-black/5 bg-[#A05C3F]"></div>
                          <span className="text-[7.5px] text-white/50 text-center font-serif tracking-widest pb-1 mt-auto">TERRACOTTA</span>
                        </div>
                      )}

                      {currentVase.id === 'celadon_porcelain' && (
                        <div className="w-20 h-22 rounded-b-[40%] border border-black/5 z-20 relative flex flex-col items-center justify-end overflow-hidden shadow-sm" style={{ backgroundColor: '#FFFFFF', background: 'radial-gradient(ellipse at 50% 10%, #FFFFFF 0%, #FAF7F2 100%)' }}>
                          <div className="w-22 h-1 bg-[#EBE3D5] mb-auto"></div>
                          <span className="text-[7.5px] text-gray-400 text-center font-mono tracking-widest uppercase pb-2">PORCELAIN</span>
                        </div>
                      )}

                      {currentVase.id === 'vintage_glass' && (
                        <div className="w-22 h-20 rounded-b-lg border border-white/40 z-20 relative flex flex-col justify-end overflow-hidden shadow-inner backdrop-blur-[1px]" style={{ backgroundColor: 'rgba(235, 245, 255, 0.25)', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.7)' }}>
                          <div className="h-2 w-full bg-cyan-100/30 border-b border-white/20"></div>
                          <div className="h-5 shrink-0 bg-blue-100/15 flex items-center justify-center pb-1">
                            {/* Stems can be seen floating in fluid */}
                            <div className="w-1 h-full bg-[#8C624E]/80 rotate-3 mx-1"></div>
                            <div className="w-1.5 h-full bg-[#8C624E]/60 rotate-[-5deg] mx-1"></div>
                          </div>
                          <span className="text-[7.5px] text-cyan-800/40 text-center font-bold tracking-widest pb-1">GLASS FLUID</span>
                        </div>
                      )}

                    </div>

                    {/* Tag description below */}
                    <div className="absolute bottom-0 left-0 right-0 text-center text-xs pointer-events-none" id="flower-custom-tag">
                      <p className="font-serif font-bold text-[#5C4A3C]">{currentPalette.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{currentStyle.name} • {currentVase.name}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Micro Details info text box */}
            <div className="border-t border-[#F2ECE4] pt-4 mt-6 z-10" id="visualizer-details-text">
              <div className="flex gap-2 items-start text-xs text-[#5F544E]">
                <span className="text-sm font-bold text-[#8C624E]">💡</span>
                <p className="leading-relaxed">
                  {isPottery 
                    ? `Bạn đã ghép nối hệ gốm mộc tạo bằng ${currentClay.desc} được phủ bóng bảo hỏa khí lớp ${currentGlaze.desc}. Khi thực hiện thiết kế ${currentShape.desc}, nhân viên sẽ hướng dẫn bạn đúng quy trình này.`
                    : `Bạn đã chọn dải màu tinh khôi ${currentPalette.desc} kết tinh trên chiếc ${currentVase.desc}. Phong cách sắp đặt ${currentStyle.name} sẽ là phom chủ đạo hướng dẫn trực quan cho bạn.`
                  }
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Selection Interactive Controls (Tabs & Custom Options) */}
          <div className="lg:col-span-6 flex flex-col space-y-6 justify-between" id="customizer-controls-column">
            
            {isPottery ? (
              /* Pottery Customizer Options */
              <div className="space-y-6" id="pottery-customizer-options">
                
                {/* 1. CLAY SELECTION */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#8C624E]" /> 1. Chọn Loại Đất Sét Mộc (Clay Base)
                  </label>
                  <p className="text-[11px] text-gray-400">Các loại thớ thổ cẩm từ vùng mỏ trầm lâu năm dẻo dai</p>
                  <div className="grid grid-cols-1 gap-2.5" id="clay-options-list">
                    {POTTERY_OPTIONS.clays.map((clay) => {
                      const active = potterySelection.clayType === clay.name;
                      return (
                        <button
                          key={clay.id}
                          id={`option-clay-${clay.id}`}
                          onClick={() => onUpdatePottery({ clayType: clay.name })}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition text-left cursor-pointer ${
                            active 
                              ? 'border-[#8C624E] bg-white shadow-xs' 
                              : 'border-[#EDEAE4] bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          {/* Color dot */}
                          <div 
                            className="w-8 h-8 rounded-lg shrink-0 border border-black/10 flex items-center justify-center text-xs font-bold text-white shadow-inner"
                            style={{ backgroundColor: clay.color }}
                          >
                            {active && '✓'}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#2D2522]">{clay.name}</p>
                            <p className="text-[10px] text-[#7A6C65] mt-0.5">{clay.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. GLAZE SELECTION */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#8C624E]" /> 2. Nước Men Phủ Hoàn Thiện (Glaze Cover)
                  </label>
                  <p className="text-[11px] text-gray-400">Pha màu bí truyền tự nhiên nung hỏa biến thủy tinh bóng mờ</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" id="glaze-options-list">
                    {POTTERY_OPTIONS.glazes.map((glaze) => {
                      const active = potterySelection.glazeType === glaze.name;
                      return (
                        <button
                          key={glaze.id}
                          id={`option-glaze-${glaze.id}`}
                          onClick={() => onUpdatePottery({ glazeType: glaze.name })}
                          className={`flex flex-col p-3 rounded-xl border-2 text-left transition h-full justify-between cursor-pointer ${
                            active 
                              ? 'border-[#8C624E] bg-white shadow-xs' 
                              : 'border-[#EDEAE4] bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full mb-2">
                            <div 
                              className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                              style={{ 
                                backgroundColor: glaze.color,
                                background: glaze.id === 'speckled' 
                                  ? 'radial-gradient(circle, #DCD5C9, #8C624E)' 
                                  : glaze.color 
                              }}
                            />
                            {active && <span className="text-[10px] text-[#8C624E] font-bold">✓ Selected</span>}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#2D2522]">{glaze.name}</p>
                            <p className="text-[9.5px] text-[#7A6C65] mt-1 line-clamp-2 leading-tight">{glaze.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. SHAPE SELECTION */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-[#8C624E]" /> 3. Tạo Hình Gốm Bản Thể (Vessel Shape)
                  </label>
                  <p className="text-[11px] text-gray-400">Chọn hình dáng mục tiêu để bắt đầu xoay tay uốn nắn</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" id="shape-options-list">
                    {POTTERY_OPTIONS.shapes.map((shape) => {
                      const active = potterySelection.shapeType === shape.name;
                      return (
                        <button
                          key={shape.id}
                          id={`option-shape-${shape.id}`}
                          onClick={() => onUpdatePottery({ shapeType: shape.name })}
                          className={`flex flex-col p-3 rounded-xl border-2 text-left transition h-full justify-between cursor-pointer ${
                            active 
                              ? 'border-[#8C624E] bg-white shadow-xs' 
                              : 'border-[#EDEAE4] bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full mb-1">
                            <span className="text-xl font-serif text-[#8C624E] font-bold opacity-80">{shape.shapeIcon}</span>
                            {active && <span className="text-xs text-[#8C624E] font-bold">✓</span>}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#2D2522]">{shape.name}</p>
                            <p className="text-[9.5px] text-[#7A6C65] mt-1 line-clamp-2 leading-tight">{shape.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              /* Flower Customizer Options @ Flowers mode */
              <div className="space-y-6" id="flower-customizer-options">
                
                {/* 1. COLOR PALETTE SELECTION */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#D49085]" /> 1. Dải Màu Hoa Cỏ Mỹ Thuật (Color Palette)
                  </label>
                  <p className="text-[11px] text-gray-400">Các giống hồng tuyết trắng bồng bềnh kết đôi sắc duyên hoa tươi</p>
                  <div className="grid grid-cols-1 gap-2.5" id="flower-palette-list">
                    {FLOWER_OPTIONS.palettes.map((palette) => {
                      const active = flowerSelection.colorPalette === palette.name;
                      return (
                        <button
                          key={palette.id}
                          id={`option-palette-${palette.id}`}
                          onClick={() => onUpdateFlower({ colorPalette: palette.name })}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition text-left cursor-pointer ${
                            active 
                              ? 'border-[#D49085] bg-white shadow-xs' 
                              : 'border-[#EDEAE4] bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          {/* Flower color circle indicator row */}
                          <div className="flex shrink-0 -space-x-2">
                            {palette.colors.map((color, idx) => (
                              <div 
                                key={idx} 
                                className="w-7 h-7 rounded-full border border-white shadow-sm flex items-center justify-center text-[10px]"
                                style={{ backgroundColor: color }}
                              >
                                {active && idx === 0 && '✓'}
                              </div>
                            ))}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#2D2522]">{palette.name}</p>
                            <p className="text-[10px] text-[#7A6C65] mt-0.5">{palette.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. STYLE SELECTION */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#D49085]" /> 2. Phom Dáng & Triết Lý Sắp Đặt (Floral Style)
                  </label>
                  <p className="text-[11px] text-gray-400">Cách điệu khối sáng và chiều phân bổ các nhánh mọc của hoa</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" id="flower-style-list">
                    {FLOWER_OPTIONS.styles.map((style) => {
                      const active = flowerSelection.styleType === style.name;
                      return (
                        <button
                          key={style.id}
                          id={`option-style-${style.id}`}
                          onClick={() => onUpdateFlower({ styleType: style.name })}
                          className={`flex flex-col p-3 rounded-xl border-2 text-left transition h-full justify-between cursor-pointer ${
                            active 
                              ? 'border-[#D49085] bg-white shadow-xs' 
                              : 'border-[#EDEAE4] bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full mb-2">
                            <span className="text-sm">🌿</span>
                            {active && <span className="text-[10px] text-[#D49085] font-bold">✓ Active</span>}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#2D2522]">{style.name}</p>
                            <p className="text-[9.5px] text-[#7A6C65] mt-1 line-clamp-2 leading-tight">{style.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. VASE SELECTION */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#2D2522] uppercase tracking-wider flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-[#D49085]" /> 3. Bình Cắm Sứ Mộc Đi Kèm (Vessel Companion)
                  </label>
                  <p className="text-[11px] text-gray-400">Chọn chiếc bình làm nương tựa vững chãi nâng đỡ linh hồn tác phẩm</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" id="flower-vase-list">
                    {FLOWER_OPTIONS.vases.map((vase) => {
                      const active = flowerSelection.vaseType === vase.name;
                      return (
                        <button
                          key={vase.id}
                          id={`option-vase-${vase.id}`}
                          onClick={() => onUpdateFlower({ vaseType: vase.name })}
                          className={`flex flex-col p-3 rounded-xl border-2 text-left transition h-full justify-between cursor-pointer ${
                            active 
                              ? 'border-[#D49085] bg-white shadow-xs' 
                              : 'border-[#EDEAE4] bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full mb-1">
                            <span className="text-lg">🏺</span>
                            {active && <span className="text-xs text-[#D49085] font-bold">✓</span>}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#2D2522]">{vase.name}</p>
                            <p className="text-[9.5px] text-[#7A6C65] mt-1 line-clamp-2 leading-tight">{vase.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* Quick action pointer to next step */}
            <div className="bg-[#FAF0EE] rounded-2xl p-4 border border-[#F4DDD8] text-xs text-[#5C4A3C]" id="customizer-footer-action-panel">
              <span className="font-semibold block mb-0.5 text-[#2D2522]">✨ Ý tưởng gieo sương vào khuôn gốm:</span>
              <span>Lựa chọn vật liệu này sẽ tự động tích hợp vào phiểu đặt gốm và hoa phía dưới. Thầy hướng dẫn sẽ chuẩn bị đúng bộ set-up sẳn sàng tại bàn chế tác của riêng bạn.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
