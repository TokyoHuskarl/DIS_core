const stringdayo =`__fn Kill_Agent {
	vname[4842] "killed agent ptr"
	defv Kill_pointer = 4842
	@comment "module_core_RTS_battlesystem_remove_agent_funcs.tpc"
	/*
	// "Access19 = AttackerObjectID
	Access20 = TargetObjectID
	Access18 = ObjTypeチェックPtr
	var1=Is_fatality
	var10=raw_damage 誤作動防止"
	*/
	//Kill_pointer = Ptr20*300
	s[212].off
	@if Ptr20 > 0 {
	    @if Ptr20 <= v[1004] {
		// "safety >0"
		@if v[Ptr18] > 0 {
		    // "309 = ID 306 = ActionState"
		    Kill_pointer = Ptr20 * 300
		    Ptr11 = Kill_pointer + 4707
		    Temp11 = Kill_pointer + 4707
		    v[826] = Kill_pointer + 4826 
		    // "Flagset"
		    v[v[826]] &= ~524288
		    // "Can be FATALITY?"
		    v[371] = var1
		    // "Randomise upsidedown"
		    v[v[826]] |=  victim_ExMotionFlags & ExMotionFlags_FLAG_horseback ? 0 : [0, 0, 4096][rnd(0, 2)] 
		    // "-1を死体とする"
		    // "ObjIDを死体に変える"
		    v[331] = v[Ptr18]
		    v[Ptr18] = -1
		    // "ActionStateを死体に変える"
		    Temp6 += 4943
		    v[Temp6] = -1
		    Temp11 = Kill_pointer +4707
		    Temp5 = v[Temp11]
		    v[Temp11].copy Temp5, 2
		    // "Colour"
		    v[Kill_pointer + 4995] = 0
		    //v[0] = v[4013..4016] = [TT1 * 1, TT1 * -2, TT1 * -2, TT1 * -2]
				v[4013] = victim_2hweapon_stain
				v[4014..4016] = victim_2hweapon_stain * -2

		    // "#base colour"
		    //v[0] = v[4001..4004] = [-22, -22, -22, -34]
		    v[4001..4003] = -22
				v[4004] = -34

		    // "#"
		    // "If victim is explosive"
		    v[373] = 0
		    @if victim_ProcessObjBit & BaseObjBit_FLAG_Explosive {
					v[190] = 4
					v[Kill_pointer + 4780] = victim_InCombatTimer <= 0 ? 50 : victim_InCombatTimer
					victim_RelativeX.copy v[361], 2
					@loop v[1017] .dst Temp20 {
							v[242] %= v[1017]
							TT11 = v[242] * 100 
							TT11 += v[1018]
							@if v[TT11] <= 1 {
								v[1301].copy v[TT11], 100
								v[TT11] = 2
								v[TT11 + 8] = Ptr20
								v[TT11 + 10] = 1236
								v[TT11 + 98] = victim_BaseAP
								//v[110] = v[TT11 + 98] = v[Kill_pointer + 4810] !?
								v[TT11 + 99] = 2
								TT1 = TT11 + 6
								Temp5.copy v[TT1], 2
								// "仕上げに登録消す"
								v[242..243] += 1
								s[141].off
								@break
						
							}
							v[242] += 1
							
					}
					
		    }

		    @if s[302] .isOn() {
					v[Kill_pointer + 4780] = 0
			
		    } .else bl {
					v[Kill_pointer + 4780] *= 2
			
		    }
		    // "#Frozen to death"
		    @if v[190] == 5 {
					// "#base colour"
					v[0] = v[4001..4004] = [55, 78, 91, -55]

			
		    } .else bl {
					// "#Death by fire!"
					@if v[190] == 4 {
							// "#base colour"
							//opt 28.4.23
							//v[0] = v[4001..4004] = [-15, -15, -15, -34]
							v[4001..4003] = -15 
							v[4004] = -93
							v[4001..4004] *= 4
							v[4013..4016] = 0
							// "#Dust Particle Effect"
							@loop v[1017] .dst Temp20 {
								v[244] %= v[1199]
								TT11 = v[244] * 50 
								TT11 += v[1198]
								@if v[TT11] <= 1 {
										// "まず清掃"
										v[1301].copy v[TT11], 50
										// "ポインタセット開始"
										// "設定"
										v[TT11] = 1
										// "500F"
										v[TT11 + 49] = 120
										// "Set itself"
										v[TT11 + 3] = 135
										// "普通にアニメ"
										TT1 = TT11 + 6
										Temp5.copy v[TT1], 2
										// "仕上げに登録消す"
										s[141].off
										v[244] += 1
										@break
										
								}
								v[244] += 1
								
							}
							
							@if var10 >= 400 {
						v[371] = 1
						v[373] = 1
						
							}
							
					}
					
		    }

		    v[4001] .add v[4013], 4
		    v[4005] = Kill_pointer 
		    v[4005] += 4991
		    v[4001].copy v[v[4005]], 4
		    // "Transparency"
		    v[Kill_pointer + 4998] = 0
		    Temp5.copy var1, 2
		    var2 += 14
		    @call .cev 2010
		    // "#WATER"
		    @if v[v[4505] + reg3] & 1 {
					v[Kill_pointer + 4998] = 35
			
		    }
		    // "#Forest"
		    @if v[v[4505] + reg3] & 8 {
					v[Kill_pointer + 4998] = 35
			
		    }
		    // "Set Head XY"
		    TT1 = Kill_pointer 
		    TT1 += 4983
		    v[0] = v[TT1..TT1 + 1] = [Temp5 * 10000, Temp6 * 10000]
		    TT1 = TT1 + 2
		    v[1301].copy v[TT1], 4
		    // "Dead sprite"
		    v[Kill_pointer + 4988] = 0
		    Temp20 = Temp11 + 14
		    v[321] = v[Temp20]
		    v[0] = s[101] = v[Temp20] >= 0 ? 0 : 1
			//####
		    Temp20 = Temp11 + 94
		    Temp20 = v[Temp20]
		    v[321] = 1
		    // " Stop AI"
				TT1 = Kill_pointer + 4703
		    v[TT1] &= ~1048576
				TT1 = Kill_pointer + 4981 
				v[ptr_null].copy v[TT1], 2
		    @if v[331] <= 10 {
					// "NOT STATIC"
					// "#Can Bleed?"
					v[372] = victim_ProcessObjBit & BaseObjBit_FLAG_Immune_to_bleed ? 1 : 0
					@if s[313] .isOn() {
						//@call .cev 1924
						func_logupdate_begin()
						TT1 = 2
						TT2 = [10, 5, 8, 1][victim_TeamID]
						v[330] = v[4562] + Ptr20
						@pic[v[1155]].strpic {
							t[20306]
							.pos TT1, v[1126] .bottomLeft
							.size 0, 0                        .chromakey 1
							.scale 100
							.trans 30
							.rgbs 100, 100, 100, 100
							.font Font_UI, Font_UI_size
							.spacing 0, 4
							.skin "" .nobg .noframe .noPadding
							.mapLayer 8
							.eraseWhenTransfer
							.affectedByFlash
							.affectedByShake
						}
						//@call .cev 1925
						func_logupdate_end()
									
					}

					// "################"
					@if s[220] .isOn() {
							// "#########################"
							v[472] = divmul(80, 100, v[2216])
							v[473] = rnd(85, 95)
							v[474] = divmul(victim_RelativeX + v[1001], v[1281], 50)
							// "#########################"
							// "If victim has big flag"
							@if victim_ProcessObjBit & 524288 {
						// "#Sounds more heavier"
						v[473] -= 18
						// "#Dust Particle Effect"
						@loop v[1017] .dst Temp20 {
								v[244] %= v[1199]
								TT11 = v[244] * 50 
								TT11 += v[1198]
								@if v[TT11] <= 1 {
									// "まず清掃"
									v[1301].copy v[TT11], 50
									// "ポインタセット開始"
									// "設定"
									v[TT11] = 1
									// "500F"
									v[TT11 + 49] = 3
									// "Set itself"
									v[TT11 + 3] = 131
									// "普通にアニメ"
									TT1 = TT11 + 6
									victim_RelativeX.copy v[TT1], 2
									// "仕上げに登録消す"
									s[141].off
									v[244] += 1
									@break
									
								}
								v[244] += 1
								
						}
						
						
							}
							@cmd 11550, "Falldown", .args v[472], 3
							@if v[372] == 0 {
								// "Get Race"
								@loop 1 {
										// "#Human"
										v[474] = divmul(victim_RelativeX + v[1001], v[1281], 50)
										@if victim_Race == 0 {
											@if victim_MoveTypeBIts & 2 { // horseman - but hey what about camel troops in future
													v[329] = rnd(1, 1)
													// "#########################"
													v[472] = divmul(75, 100, v[2216])
													v[473] = rnd(75, 115)
													inputstr .asg "vo\horse_death"
													inputstr .cat v[329]
													TT1 = 510
													// "Strings = t[TT1]"
													@cmd 11550, t[TT1], .args v[472], 3
													// "#########################"
													
											} .else bl {
													TT1 -= 1
													// "##Not Female"
													v[182] += 1
													@if victim_Skin != 6 {
														@if v[190] == 4 {
																v[329] = rnd(1, 3)
																// "#########################"
																v[472] = divmul(85, 100, v[2216])
																v[473] = rnd(90, 110)
																inputstr .asg "vo\man_burnt_to_death"
																inputstr .cat v[329]
																TT1 = 510
																// "Strings = t[TT1]"
																@cmd 11550, t[TT1], .args v[472], 3
																// "#########################"
																
														} .else bl {
																v[329] = rnd(1, 6)
																// "#########################"
																v[472] = divmul(75, 100, v[2216])
																v[473] = rnd(85, 110)
																inputstr .asg "vo\man_death"
																inputstr .cat v[329]
																TT1 = 510
																// "Strings = t[TT1]"
																@cmd 11550, t[TT1], .args v[472], 3
																// "#########################"
																
														}
														
													} .else bl {
														// "##Female"
														v[329] = rnd(1, 5)
														// "#########################"
														v[472] = divmul(75, 100, v[2216])
														v[473] = rnd(95, 115)
														inputstr .asg "vo\woman_death"
														inputstr .cat v[329]
														TT1 = 510
														// "Strings = t[TT1]"
														@cmd 11550, t[TT1], .args v[472], 3
														// "#########################"
														
													}
													
											}
											@break
											
										}
										// "#Goblin"
										@if victim_Race == 1 {
											v[182] += 1
											@if v[190] == 4 {
													v[329] = rnd(1, 3)
													// "#########################"
													v[472] = divmul(85, 100, v[2216])
													v[473] = rnd(90, 110)
													inputstr .asg "vo\goblin_scream"
													inputstr .cat v[329]
													TT1 = 510
													// "Strings = t[TT1]"
													@cmd 11550, t[TT1], .args v[472], 3
													// "#########################"
													
											} .else bl {
													v[329] = rnd(1, 2)
													// "#########################"
													v[472] = divmul(75, 100, v[2216])
													v[473] = rnd(90, 110)
													inputstr .asg "vo\goblin_death"
													inputstr .cat v[329]
													TT1 = 510
													// "Strings = t[TT1]"
													@cmd 11550, t[TT1], .args v[472], 3
													// "#########################"
													
											}
											@break
											
										}
										// "#Ork"
										@if victim_Race == 2 {
									v[182] += 1
									@if v[190] == 4 {
											v[329] = rnd(1, 3)
											// "#########################"
											v[472] = divmul(85, 100, v[2216])
											v[473] = rnd(90, 110)
											inputstr .asg "vo\ork_scream"
											inputstr .cat v[329]
											TT1 = 510
											// "Strings = t[TT1]"
											@cmd 11550, t[TT1], .args v[472], 3
											// "#########################"
											
									} .else bl {
											v[329] = rnd(1, 4)
											// "#########################"
											v[472] = divmul(75, 100, v[2216])
											v[473] = rnd(85, 110)
											inputstr .asg "vo\ork_death"
											inputstr .cat v[329]
											TT1 = 510
											// "Strings = t[TT1]"
											@cmd 11550, t[TT1], .args v[472], 3
											// "#########################"
											
									}
									@break
									
										}
										// "#Dragons"
										@if victim_Race == 3 {
									v[182] += 1
									@if v[190] == 4 {
											// "#########################"
											v[472] = divmul(85, 100, v[2216])
											v[473] = rnd(90, 110)
											// "Strings = t[TT1]"
											@se.play "vo\dragon_gyaoo" .opt v[472], v[473], v[474]
											// "#########################"
											
									} .else bl {
											v[329] = rnd(1, 2)
											// "#########################"
											v[472] = divmul(75, 100, v[2216])
											v[473] = rnd(90, 110)
											inputstr .asg "vo\Dragon_death"
											inputstr .cat v[329]
											TT1 = 510
											// "Strings = t[TT1]"
											@cmd 11550, t[TT1], .args v[472], 3
											// "#########################"
											
									}
									@break
									
										}
										// "#Minotaurs"
										@if victim_Race == 6 {
									v[182] += 1
									@if v[190] == 4 {
											// "#########################"
											v[472] = divmul(85, 100, v[2216])
											v[473] = rnd(90, 110)
											// "Strings = t[TT1]"
											@se.play "vo\minotaur_death1" .opt v[472], v[473], v[474]
											// "#########################"
											
									} .else bl {
											v[329] = rnd(1, 3)
											// "#########################"
											v[472] = divmul(75, 100, v[2216])
											v[473] = rnd(90, 110)
											inputstr .asg "vo\minotaur_death"
											inputstr .cat v[329]
											TT1 = 510
											// "Strings = t[TT1]"
											@cmd 11550, t[TT1], .args v[472], 3
											// "#########################"
											
									}
									@break
									
										}
										
								}
								
								// "Fatality"
								var1 = rnd(5, 7)
								var2 = 2
								@if v[371] == 1 {
										var1 *= 2
										var2 += 1
										// "Cut"
										@if v[190] == 0 {
									// "#########################"
									v[471] = 11550
									v[472] = divmul(80, 100, v[2216])
									v[473] = rnd(90, 110)
									// "#########################"
									@cmd v[471], "gib\beheaded_nenetei", .args v[472], 3
									
										}
										// "Pierce"
										@if v[190] == 1 {
									// "#########################"
									v[471] = 11550
									v[472] = divmul(80, 100, v[2216])
									v[473] = rnd(90, 110)
									// "#########################"
									@cmd v[471], "gib\gutted_nenetei", .args v[472], 3
									
										}
										// "Blunt"
										@if v[190] == 2 {
									// "#########################"
									v[471] = 11550
									v[472] = divmul(80, 100, v[2216])
									v[473] = rnd(78, 90)
									// "#########################"
									@cmd v[471], "gib\smashed_nenetei", .args v[472], 3
									
										}
										
								}
								// "death blood effect"
								@loop v[1017] .dst Temp20 {
										v[244] %= v[1199]
										TT11 = v[244] * 50 + v[1198]
										@if v[TT11] <= 1 {
									// "まず清掃"
									v[1301].copy v[TT11], 50
									// "ポインタセット開始"
									// "設定"
									v[TT11] = 1
									// "500F"
									v[TT11 + 49] = var2
									// "Set itself"
									v[TT11 + 3] = 156
									// "Set Amount"
									v[TT11 + 1] = var1
									// "XY set"
									TT17 = TT11 + 6
									victim_RelativeX.copy v[TT17], 2
									// "仕上げに登録消す"
									v[244] += 1
									@break
									
										}
										v[244] += 1
										
								}
								
								
							}
							
					}
					Temp5.copy v[361], 2

					// "Set into BodyList"

					//opt 28.4.23
					//v[v[4531] + v[1004] - 1] = Ptr20
					//v[v[4531] + v[1004]] += 1
					//TT1 = v[4531] + v[1004] 
					TT1 = v[4531] + v[1004]
					v[TT1- 1] = Ptr20
					v[TT1] += 1

					TT1 -= 1
					v[v[4531]].sortDescending v[1004]
					// "FATALITY"
					v[Kill_pointer + 4988] = 0
					@if v[371] == 1 {
							@if v[372] == 0 {
								s[212].on
								// "Blood_big"
								@loop v[1163] .dst Temp20 {
										v[418] %= v[1163]
										//opt
										//Temp1 = v[418] * 100
										//Temp1 = Temp1 + v[1162]
										Temp1 = v[418] * 100
										Temp1 += v[1162]
										@if v[Temp1] <= 1 {
											// "まず清掃"
											v[1301].copy v[Temp1], 100
											// "ポインタセット開始"
											Temp10 = v[418] + v[1164]
											Ptr15 = Temp1 + 99
											// "設定"
											v[Temp1] = 3
											// "500F"
											v[Ptr15] = 600
											// "ziko"
											Ptr15 = Temp1 + 3
											v[Ptr15] = 112
											// "普通にアニメ"
											v[361] += rnd(-2, 2)
											v[362] += rnd(6, 9)
											Temp5 = rnd(3, 6)
											v[361].copy var1, 2
											var2 -= 12
											@call .cev 2010
											// "WATER"
											v[634] = 100
											@if v[v[4505] + reg3] & 1 {
													v[631] = 160
													v[632..633] = 30
													@pic[Temp10].show {
												"effects\sprite_fresheffects"
												.pos v[361], v[362] .center
												.scrollWithMap
												.chromakey 1
												.scale 0
												.trans 8
												.rgbs 40, 40, 40, 100
												.multi
												.grid 10, 10 .cell Temp5
												.mapLayer 2
												.eraseWhenTransfer
												.affectedByTint
												.affectedByFlash
												.affectedByShake
													}
													
											} .else bl {
													v[631..633] = 100
													@pic[Temp10].show {
												"effects\sprite_fresheffects"
												.pos v[361], v[362] .center
												.scrollWithMap
												.chromakey 1
												.scale 0
												.trans 8
												.rgbs 100, 100, 100, 100
												.grid 10, 10 .cell Temp5
												.mapLayer 2
												.eraseWhenTransfer
												.affectedByTint
												.affectedByFlash
												.affectedByShake
													}
													
											}
											Ptr15 = Temp1 + 30
											v[631].copy v[Ptr15], 4
											TT1 = Temp1 + 6
											v[361].copy v[TT1], 2
											// "仕上げに登録消す"
											v[418] += 1
											s[141].off
											@break
											
										}
										v[242] += 1
										
								}
								
								// "Element == Cut,-decapitation"
								@if v[190] == 0 {
										v[373] = 1
										
								} .else bl {
										// "Element == Blunt,-Smash Head"
										@if v[190] == 2 {
											// "Smashable flag"
											@if victim_ExMotionFlags & 64 {
												TT10 = victim_PictArray
													@while TT10 >= 1 {
														// "detect head"
														TT1 = victim_PictArray % 10
														@if TT1 == 2 {
																// "set crushed head sprite"
															

																// WRITE SOMETHING HERE!!!!!!!!!!!!!!!!!!!

																// v[(Ptr20 - 1) * 6 + 1 + v[1185]] = v[Kill_pointer + 4764] * -1 - 1 //ACHTUNG, outdated func
																@break
																
														}
														TT10 /= 10
												
													}
													
													
											}
											@if var10 >= 400 {
													v[373] = 1
													
											}
											
										} .else bl {
											@if v[190] == 4 {
													@if victim_ExMotionFlags & 128 {
														TT10 = victim_PictArray
														@while TT10 >= 1 {
																// "detect head"
																TT1 = TT10 % 10
																@if TT1 == 2 {
																	// "set skull sprite"

																	// WRITE SOMETHING HERE!!!!!!!!

																	// v[(Ptr20 - 1) * 6 + 1 + v[1185]] = 50000000//ACHTUNG outdatedfunc
																	@break
															
																}
																TT10 /= 10
																
														}
													}
											}
											
										}
										
								}

								@if v[373] == 1 {
										// "Reset Head XY"
										TT1 = Kill_pointer 
										TT1 += 4983
										v[0] = v[TT1..TT1 + 1] = [rnd(-47000, 47000), v[Kill_pointer + 4711] * -12000 + rnd(-15000, 0)]
										v[Kill_pointer + 4985] = rnd(-4, 4) * 2250
										v[Kill_pointer + 4986] = rnd(1, 4) * -300
										v[Kill_pointer + 4988] = rnd(13, 16)
										v[Kill_pointer + 4989] = rnd(-1800000, 1800000)
										
								}
								
							}
							
					}
					v[Ptr18] = v[331] * -1
					// "#Cause Morale Check"
					// "##Fatality affects morale more heavily"
					v[330] = v[371] == 1 ? 58 : 44
					// "#ck only 3nd dim"
					TT1 = victim_Morton >> 4
					v[339] = v[v[1074] + TT1]
					v[340] = v[1070] + TT1 * v[1004]
					v[193] = victim_Level // get victim level
					v[338] = 0
					@loop v[339] .dst Temp10 {
						Temp12 = v[340] + Temp10
						// "#confused fight"
						@if Temp10 >= 48 {
							v[338] = rnd(0, 1)
					
						}

						@if v[338] == 0 {
							@if v[Temp12] > 0 {
								// "#is obj alive?"
								Temp11 = v[Temp12] * v[1117] + 4701
								@if v[Temp11] >= 1 {
									// "team check"
									// "v1= targobj-	v2=power#30+lv/2?"
									var1 = v[Temp12]
									@if v[Const_AgentMetaTeam_begin + Ptr20 - 1] != v[Const_AgentMetaTeam_begin + var1 - 1] { // lmao wtf it's over
										var2 = v[193] / 2 + 4
										func_bs_morale_recover(var1 var2)
										
									} .else bl {
										@if s[34] .isOff() {
											var2 = v[193] - v[var1 * 300 + 4804] + v[330]
											func_bs_morale_check(var1 var2)
									
										}
											
									}
							
								}
								
							}
					
						}
						
					}
					
					
						} .else bl {
							// "STATIC"
							Bool_Refresh_Static_Minimap.on //request refresh minimap static
							TT1 = Kill_pointer + 4712 
							v[1301].copy v[TT1], 2
							// "wrecks remain longer"
							@if s[302] .isOff() {
									v[Kill_pointer + 4780] = v[1240] * v[4571] * 5
									
							}
							@if s[34] .isOn() {
									v[Kill_pointer + 4780] = 10
									
							}
							// "##########Foundation##########"
							@if victim_AgentBits & 32 {
									v[Ptr18] = 0
									v[2538] -= 1
									@if s[34] .isOn() {
								// "refund"
								@if v[Kill_pointer + 4703] & 2097152 {
										var4 = v[Kill_pointer + 4980]
										@if var4 >= 800 {
									s[175].on
									var1 = Kill_pointer + 4710
									v[var1].copy var1, 2
									v[11..12] *= 2
									s[151].on
									@call .cev var4
									s[151].off
									v[300001] .add v[31], 4
									@call .cev 84
									
										}
										
								}
								
									}
									
							}
							@if s[175] .isOn() {
									@if s[313] .isOn() {
								//@call .cev 1924
								func_logupdate_begin()
								TT1 = 2
								TT2 = [10, 5, 8, 1][victim_TeamID]
								v[330] = v[4562] + Ptr20
								@pic[v[1155]].strpic {
										t[20444]
										.pos TT1, v[1126] .bottomLeft
										.size 0, 0                            .chromakey 1
										.scale 100
										.trans 30
										.rgbs 100, 100, 100, 100
										.font Font_UI, Font_UI_size
										.spacing 0, 4
										.skin "" .nobg .noframe .noPadding
										.mapLayer 8
										.eraseWhenTransfer
										.affectedByFlash
										.affectedByShake
								}
								//@call .cev 1925
								func_logupdate_end()
									}
									
							} .else bl {
									@if s[313] .isOn() {
								//@call .cev 1924
								func_logupdate_begin()
								TT1 = 2
								TT2 = [10, 5, 8, 1][victim_TeamID]
								v[330] = v[4562] + Ptr20
								@pic[v[1155]].strpic {
										t[20304]
										.pos TT1, v[1126] .bottomLeft
										.size 0, 0                            .chromakey 1
										.scale 100
										.trans 30
										.rgbs 100, 100, 100, 100
										.font Font_UI, Font_UI_size
										.spacing 0, 4
										.skin "" .nobg .noframe .noPadding
										.mapLayer 8
										.eraseWhenTransfer
										.affectedByFlash
										.affectedByShake
								}
								func_logupdate_end()
								//@call .cev 1925
								
									}
									
							}

							// "################"
							TT1 = Ptr18 + 100
							v[2515] += s[7] == 1 ? 1 : 0
							@if victim_UnitID != 6 { // classic version's LEGACY - static ID 6 was living shadow. eventually you can get rid of this @if   
									v[Ptr18] = -11
									@if s[175] .isOff() {
										v[474] = divmul(victim_RelativeX + v[1001], v[1281], 50)
										@if s[220] .isOn() {
												@if v[TT1] == 2 {
													// "hatake"
													v[471] = 11550
													v[472] = divmul(85, 100, v[2216])
													v[473] = rnd(75, 85)
													// "#########################"
													@cmd v[471], "pollen", .args v[472], 3
											
												} .else bl {
													// "#########################"
													v[471] = 11550
													v[472] = divmul(85, 100, v[2216])
													v[473] = rnd(75, 85)
													// "#########################"
													@cmd v[471], "Earth1", .args v[472], 3
													s[141].on
													@call .cev 95
											
												}
												
										}
										
									}
						 
							}
							// "##########	Wall##########"
							@if victim_UnitType == 107 {
									v[Ptr18] = 0
									TT2 = Ptr18 + 200
									v[TT2].copy v[801], 6
									// "Generate Wall"
									@loop v[806] .dst v[2064] {
										Ptr6 = v[803] - Map_LimitCoordX_min + var_Map_Width * (v[804] - Map_LimitCoordY_min) + var_Map_Width * v[2064] + v[4529]
										Ptr7 = v[803] - Map_LimitCoordX_min + var_Map_Width * (v[804] - Map_LimitCoordY_min) + var_Map_Width * v[2064] + v[1182]
										@loop v[805] .dst v[2065] {
												Temp11 = v[2065] + v[803]
												Temp12 = v[2064] + v[804]
												@map.getTerrain .pos Temp11, Temp12 .dst reg10
												@if reg10 >= 18 {
													TT1 = v[Ptr7] % 100000 / 100
													@map.rewrite .lower .single TT1 .xywh Temp11, Temp12, 1, 1
													@map.getTerrain .pos Temp11, Temp12 .dst reg10
											
												}
												v[Ptr7] /= 100
												v[Ptr7] *= 100
												v[Ptr7] += reg10
												// "#TileFuncPushFlag"
												v[Ptr6] &= ~1
												v[286..287] += 1
												
										}
										
										
									}
									
									// "gate"
									@if v[Ptr18 + 2] & 256 {
										v[Ptr18] = -11
										v[807] = Ptr18 + 206
										v[v[807]].copy v[807], 3
										@loop v[809] .dst v[2064] {
											Ptr6 = v[4564] * (v[807] + v[433] * v[2064]) + v[4569] - 1
											@loop v[808] .dst v[2065] {
												// "init"
												Ptr7 = Ptr6 + 3
												// "Cost Set"
												v[Ptr7] += 15
												@if victim_AgentBits & 8 {
														v[Ptr7] -= 45
														
												}
												// "1"
												Ptr6 += v[4564]
												
											}
												
												
										}
								
								
									} .else bl {
										// "justawall"
										s[174].on
										v[807] = Ptr18 + 206
										v[v[807]].copy v[807], 3
										@loop v[809] .dst v[2064] {
											Ptr6 = v[4564] * (v[807] + v[433] * v[2064]) + v[4569] - 1
											@loop v[808] .dst v[2065] {
												// "init"
												Ptr7 = Ptr6 + 3
												// "Cost Sub"
												v[Ptr7] -= 24
												// "1"
												Ptr6 += v[4564]
										
											}
												
												
										}
										
										
									}
									
							}

							// "Node Cost"
							@if !between(victim_UnitType, 104, 105) {
								v[807] = Ptr18 + 206
								v[v[807]].copy v[807], 3
								@loop v[809] .dst v[2064] {
									Ptr6 = v[4564] * (v[807] + v[433] * v[2064]) + v[4569] - 1
									@loop v[808] .dst v[2065] {
										// "init"
										Ptr7 = Ptr6 + 3
										// "Cost Set"
										v[Ptr7] -= 5
										// "1"
										Ptr6 += v[4564]
											
									}
							
							
								}
								
									
							}
							// "##########House##########"
							@if victim_AgentBits & 64 {
									// "#Not Dragons"
									@if v[2403 + victim_TeamID % 3] != 3 {
										v[v[4580] + victim_TeamID % 3] -= 6
										// "#Potetons"
										@if v[2403 + victim_TeamID % 3] == 8 {
												v[v[4580] + victim_TeamID % 3] -= 2
												
										}
								
									}
									
							}

							@if victim_TeamID == 0 { // player team
									@if victim_UnitType != 105 {
										@if victim_UnitType != 104 {
												@if s[174] .isOff() {
													v[v[4580] + victim_TeamID % 3] -= 1
											
												}
												// victim_AgentBits = v[Ptr18 + 3] ?
												@if victim_AgentBits & 64 {
													v[496] -= 1
													s[205].on
													@call .cev 84
													s[205].off
											
												}
												
										}
										
									}

									// "Library"
									@if victim_UnitID == 38 {
										v[493] -= 1
								
									}
									
							}
							// "Set into BodyList"
							@if s[174] .isOff() {
									v[v[4531] + v[1004] - 1] = Ptr20
									TT1 = v[4531] + v[1004] - 1
									v[v[4531]].sortDescending v[1004]
									
							}
							s[175].off
							
						}
						// "Remove from UnitList"
						var1 = Ptr20
						var2 = v[331]
						@call .cev 1896
						// "Team Get	!TEAM LIST!"
						Temp8 = victim_TeamID % 3
						@if Temp8 != -1 { // NOT GAIA
							@if Temp8 != 2 {// "NOT  neutral"
								Temp10 = Temp8 + 205 
								Temp10 = v[Temp10] // get ptr? 
								Temp9 = 1145 + Temp8
								Temp9 = v[Temp9] // get ptr? of what? damn
								Temp10 += Temp9
								@while Temp9 <= Temp10 {
										Temp11 = Temp9 + Temp10
										Temp11 /= 2
										@if v[Temp11] == Ptr20 {
										v[Temp11] = 0
										@break
									
										} .else bl {
											@if v[Temp11] < Ptr20 {
													Temp10 = Temp11 - 1
													
											} .else bl {
													Temp9 = Temp11 + 1
													
											}
											
										}
										
								}
								
								Temp9 = v[1145 + Temp8]
								v[Temp9].sortDescending v[1012]
								@if victim_AgentType > -9 { // this was bugging
										// "If not STATIC, Count TroopID Death"
										v[v[1259] + (victim_UnitID - 1) * 4 + 2 + v[victim_SaveActualTeamID * v[1260] * 4] += 1
										
								}
								// "Colなし施設はカウントされてないので引かない"
								@if Temp8 == 0 {
										v[205] -= victim_UnitType != 104 && victim_UnitType != 105 && s[174] == 0 ? 1 : 0
										v[2513] += 1
										
								} .else bl {
										v[206] -= victim_UnitType != 104 && victim_UnitType != 105 && s[174] == 0 ? 1 : 0
										v[2514] += 1
										
								}
								
							}
						}

						s[174].off
						// "Collision Counter"
						v[196] -= victim_ColDimension != -1 ? 1 : 0
						// "EXP" - system abolished?
						// v[2701] += victim_TeamID == 1 ? v[v[700] - 41] : 0
						

						// "Set HP 0"
						v[Kill_pointer + 4806] = -1
						// "ObjA"
						v[204] -= 1
						// "###############Draw_newPicture"
						Temp14 = Kill_pointer + 4700
						@if victim_AgentType == -3 { // multi layered unit
							v[441] = 188
							v[442] = 1
							v[443] = 305
							v[444] = 306
							v[445] = 1
							v[448] = 1
							v[453..454] = 0
							v[457] = 0
							v[458] = 1
							v[459] = 0 //1
							v[460] = 0//320
							v[461..462] = 0
							v[465] = 1
							v[466] = 321
							v[467] = 0
							v[470] = 113
							v[447] = 0
							v[449..451] = 82
							v[452] = 75
							v[449..452] = 0
							v[463] = 5
							v[464] = 1
							v[321] = 1
							// "Z "
							v[455] = 0
							@if v[Kill_pointer + 4826] & 4096 {
									Temp15 = !v[Kill_pointer + 4844] * 4096 | 8192
									Temp12 = -18
									
							} .else bl {
									Temp15 = !v[Kill_pointer + 4844] * 4096
									Temp12 = 0
									
							}
							v[Kill_pointer + 4979] = 0
							@if s[314] .isOff() {
									@if s[220] .isOn() {
								@if v[331] == 3 {
										@if v[Kill_pointer + 4950] != -1 {
									@if (Temp15 & 4096) > 0 {
											@if (Temp15 & 8192) > 0 {
										v[Kill_pointer + 4982] = -24
										v[Kill_pointer + 4981] = 16
										v[Kill_pointer + 4979] = rnd(-720000, -600000)
										
											} .else bl {
										v[Kill_pointer + 4982] = -4
										v[Kill_pointer + 4981] = 16
										v[Kill_pointer + 4979] = rnd(600000, 720000)
										
											}
											
									} .else bl {
											@if (Temp15 & 8192) > 0 {
										v[Kill_pointer + 4982] = -24
										v[Kill_pointer + 4981] = -16
										v[Kill_pointer + 4979] = rnd(600000, 720000)
										
											} .else bl {
										v[Kill_pointer + 4982] = -4
										v[Kill_pointer + 4981] = -16
										v[Kill_pointer + 4979] = rnd(-720000, -600000)
										
											}
											
									}
									@if v[Kill_pointer + 4738] & 2 {
											v[Kill_pointer + 4982] -= 28
											
									}
									
										} .else bl {
									v[Kill_pointer + 4979] = 0
									v[Kill_pointer + 4982] = 0
									v[Kill_pointer + 4981] = 0
									
										}
										
								}
								
									} .else bl {
								v[Kill_pointer + 4979] = 0
								v[Kill_pointer + 4982] = 0
								v[Kill_pointer + 4981] = 0
								
									}
									
							}
							//Set using Cache Flag
							v[Ptr20 * 300 + 4825] |= 512

							// "Get ID From Cache"
							v[188] = (Ptr20 - 1) * Const_layer_amount + v[1201]
							TT1 = v[Temp14 + 290]
							// "Count Picture Layer Array"
							TT5 = victim_PictArray
							@if TT10 != 0 {
									@while TT5 > 0 .dst TT6 {
										TT5 /= 10
										
									}
									
									TT6 += 1
									
							}
							// "remove drawn sprites once"
							@if s[Ptr20 + 500] == 1 {
									// "safety"
									@if TT1 > 0 {
								@loop TT6 .dst TT2 {
										TT2 += TT1
										// "Safety"
										@pic[TT2].erase
										
								}
								
								
									}
									v[188] = TT1
									
							} .else bl {
									// "safety"
									@if v[188] > 0 {
										@loop 6 .dst TT2 {
												TT2 += v[188]
												// "Safety"
												@pic[TT2].erase
												
										}
								
								
									}
									
							}

							@if v[188] >= 1 {
									v[178] = v[188]
									// "#get damaged variation"
									//v[604] = v[Kill_pointer + 4704]
									//v[0] = v[343..352] = [v[604] % 10, v[604] / 10 % 10, v[604] / 100 % 10]
									v[468] = 3
									v[187] = 0
									v[379] = 0
									v[378] = 0
									v[4101..4110] = v[463]
									v[4121..4130] = 1
									// v[v[725]].copy v[725],2 - was this needed? idk

									v[4106] = victim_ExMotionFlags & ExMotionFlags_FLAG_horseback ? 7 : 5// horse
									v[4111..4120] = v[321] 
									v[4115] = 2

									//SEEMS Maniacs Patch itself has bug <- no you just ignored your cache system - which will be obsolete
									fuction_drawing_set_grid()


									//so temporary head setting - use legacy damaged head sprite 
									v[335] =  (Ptr20 - 1) * 10
									v[335] = Const_str_agent_pictures_strings_start + v[335]
								
									//set damaged head
									@if (victim_ExMotionFlags & 98304) == 32768 {
										v[4102] = 5
										v[4122] = 1
										var1 = v[335] + 2
										t[var1].exMatch ("[0-9]{1,}",str1,var2)
										t[var1].asg "parts\bodyset\set\damaged\spr_damaged_head_"
										t[var1].cat str1
									}

									v[339] = -1
									@if victim_ExMotionFlags & 134217728 {
										v[4034] = 0
										v[4124] = 2
										v[4114] += v[455] / 4096 * v[4104]
										
									}


									Temp10 = victim_PictArray
									@while Temp10 >= 1 .dst v[340] {
										TT1 = Temp10 % 10
										//Ptr6 = 900 + TT1 + 10 * v[TT1 + 342]
										Ptr6 = TT1 + v[335]
										v[463] = 4100 + TT1
										v[463] = v[v[463]]
										v[464] = 4120 + TT1
										v[464] = v[v[464]] 
										v[321] = 4110 + TT1
										v[321] = v[v[321]]
										// "#########################Layer own Setting"
										// "Found Head" 
										@if TT1 == 2 || victim_AddMotionBits & 524288 && TT1 == 3 {
												v[378] |= 2
												//If damaged head found-> then check the damaged grid
												// "Save Head Pic ID"
												v[379] = v[188]
												
										}
										v[891] = Temp14 + 291
										//TT1 = (TT1 - 1) % 6
										// "#Decapitated!"
										@if v[Temp14 + 288] > 0 && victim_ExMotionFlags & 32 && between(TT1, 1, 2) {
												v[0] = v[305..306] = [Temp11 + v[Temp14 + 283] / 10000, Temp12 + v[Temp14 + 284] / 10000]
												v[0] = v[453..456] = [3, v[Temp14 + 289], v[455], 10000]
												
										} .else bl {
												Temp11.copy Temp5, 2
												v[0] = v[453..456] = [0, 0, v[455], 0]
												
										}
										// "Layer own Setting END#########################"
										//Temp20 = v[(Ptr20 - 1) * 6 + TT1 + v[1185]]
										// "Strings = t[Ptr6]"
										@cmd 11110, t[Ptr6], .args v[441], 30 // wtf lmao

										// "When you found helmet AND already Loaded Head Part, then"
										@if (TT1 == 3 || TT1 == 9) && v[378] & 2 {
												@if victim_AddMotionBits & 524288 {
													@pic[v[188]].getInfo .cewh .baseRect TT20, TT20, TT15, TT16
													@pic[v[188]].getInfo .pixel 0, 0, TT15, TT16 .dst 550445
											
												} .else bl {
													@pic[v[188]].setId .move 2599, 1
													@pic[2599].getInfo .cewh .baseRect TT20, TT20, TT15, TT16
													@pic[2599].getInfo .pixel 0, 0, TT15, TT16 .dst 550445
											
												}
												// "V4  #0, 1= center"
												var1 = v[379]
												var2 = 0
												var3 = 0
												@pic[var1].getInfo .cewh .baseRect TT20, TT20, var9, var10
												v[19..20] /= 2
												var8 = Adr_PixelBufferHead
												@loop TT16 .dst var5 {
											@loop TT15 .dst var6 {
													var7 = v[var8]
													@if (var7 & 0xFF000000) == 0xFF000000 {
														TT18 = var2 + var6
														TT18 -= TT15 / 2
														TT19 = var3 + var5
														TT19 -= TT16 / 2
														TT18 .add var9, 2
														@pic[var1].setPixel .xywh TT18, TT19, 1, 1 .src var7
												
													}
													var8 += 1
													
											}
											
											
												}
												
												@if s[212] .isOn() {
											@if v[372] == 0 {
													@if v[190] == 1 {
												// "#Arrow"
												@if v[422] == 1 {
														str1 .asg "stamp\wound_1"
														var1 = v[379]
														var2 = 4 + rnd(-1, 3)
														var3 = 5 + rnd(-3, 1)
														var4 = 1
														func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
														
												}
												// "#Bolt"
												@if v[422] == 2 {
														str1 .asg "stamp\wound_2"
														var1 = v[379]
														var2 = 4 + rnd(-1, 3)
														var3 = 5 + rnd(-3, 1)
														var4 = 1
														func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
														
												}
												@if v[422] == 3 {
														str1 .asg "stamp\wound_3"
														var1 = v[188]
														var1 = v[379]
														var2 = 4 + rnd(-1, 3)
														var3 = 4 + rnd(-3, 1)
														var4 = 1
														func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
														
												}
												
													}
													
											} .else bl {
													
											}
											
												}
												@if !(victim_AddMotionBits & 524288) {
													// "save helm pos"
													v[339] = v[340]
													// "don't spend pic cache"
													v[186..188] -= 1
													@pic[2599].erase
											
												} .else bl {
													v[339] = 0
											
												}
												
										}
										// "######STAMP######"
										// "#######Armor"
										@if TT1 == 1 { //0
												// "#######Greenskins"
												@if between(victim_Race, 1, 2) {
											@if (v[378] & 2) == 0 {
													str1 .asg "stamp\extradeadbody_1"
													var1 = v[188]
													var2 = -4
													var3 = 12
													var4 = 1
													func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
													
											}
											
												} .else bl {
											@if victim_Race == 5 {
													@if (v[378] & 2) == 0 {
												str1 .asg "stamp\extradeadbody_2"
												var1 = v[188]
												var2 = -4
												var3 = 12
												var4 = 1
												func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
												
													}
													
											} .else bl {
													
											}
											@if victim_Race == 6 {
													@if (v[378] & 2) == 0 {
												str1 .asg "stamp\extradeadbody_3"
												var1 = v[188]
												var2 = -4
												var3 = 12
												var4 = 1
												func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
												
													}
													
											} .else bl {
													
											}
											
												}
												@if v[372] == 0 {
											// "#######Cut"
											@if v[190] == 0 {
													// "#######Melee Normal"
													@if v[422] == 0 {
												@if v[371] == 0 {
														str1 .asg "stamp\cut"
														var1 = v[188]
														var2 = 12 + rnd(-1, 1)
														var3 = 24 + rnd(0, 1)
														var4 = 0
														func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
														
												}
												
													}
													
											}
											// "#######P"
											@if v[190] == 1 {
													// "#######Melee Normal"
													@if v[422] == 0 {
												str1 .asg "stamp\stabbed"
												var1 = v[188]
												var2 = 12 + rnd(-1, 1)
												var3 = 24 + rnd(-1, 1)
												var4 = 0
												func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
												@if s[212] .isOn() {
														str1 .asg "stamp\guts"
														var1 = v[188]
														var2 = 12 + rnd(-1, 1)
														var3 = 24 + rnd(-1, 1)
														var4 = 0
														func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
														
												}
												
													}
													@if s[212] .isOff() {
												// "#Arrow"
												@if v[422] == 1 {
														str1 .asg "stamp\wound_1"
														var1 = v[188]
														var2 = 13 + rnd(-2, 2)
														var3 = 20 + rnd(-1, 1)
														var4 = 0
														func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
														
												} .else bl {
														// "#Bolt"
														@if v[422] == 2 {
													str1 .asg "stamp\wound_2"
													var1 = v[188]
													var2 = 13 + rnd(-2, 2)
													var3 = 20 + rnd(-1, 1)
													var4 = 0
													func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
													
														} .else bl {
													@if v[422] == 3 {
															str1 .asg "stamp\wound_3"
															var1 = v[188]
															var2 = 13 + rnd(-2, 2)
															var3 = 19 + rnd(-1, 1)
															var4 = 0
															func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
															
													}
													
														}
														
												}
												
													}
													
											}
											
												} .else bl {
											
												}
												
										} .else bl {
												// "#######Head"
												@if TT1 == 2 { //341
											@if s[1] .isOn() {
													@if v[190] == 1 {
												// "#######Melee Normal"
												@if v[422] == 0 {
														str1 .asg "stamp\stabbed"
														var1 = v[188]
														var2 = 4 + rnd(-1, 2)
														var3 = 8 + rnd(-2, 2)
														var4 = 1
														func_stamp_picture_on_pic_id(str1 var1 var2 var3 var4)
														
												}
												
													}
													
											}
											
												}
												
										}
										v[186..188] += 1
										Temp10 /= 10
										
									}
									
									
							}
							// "#####################"
							@if (Temp15 & 4096) > 0 {
									@if (Temp15 & 8192) > 0 {
								@loop v[187] .dst TT1 {
										TT1 += v[178]
										@pic[TT1].move {
									.relative
									.pos 0, 0 .center
									.scale 0
									.trans 0
									.time 0
									.keepRgbs
									.keepEffect
									.vrev 
										}
										
								}
								
								
									} .else bl {
								@loop v[187] .dst TT1 {
										TT1 += v[178]
										@pic[TT1].move {
									.relative
									.pos 0, 0 .center
									.scale 0
									.trans 0
									.time 0
									.keepRgbs
									.keepEffect
									.hrev 
										}
										
								}
								
								
									}
									
							} .else bl {
									@if (Temp15 & 8192) > 0 {
								@loop v[187] .dst TT1 {
										TT1 += v[178]
										@pic[TT1].move {
									.relative
									.pos 0, 0 .center
									.scale 0
									.trans 0
									.time 0
									.keepRgbs
									.keepEffect
									.hrev .vrev 
										}
										
								}
								
								
									} .else bl {
								@loop v[187] .dst TT1 {
										TT1 += v[178]
										@pic[TT1].move {
									.relative
									.pos 0, 0 .center
									.scale 0
									.trans 0
									.time 0
									.keepRgbs
									.keepEffect
										}
										
								}
								
								
									}
									
							}
							// "Weapons fall"
							TT1 = Temp15
							Temp15 = Temp14 + 261
							v[1301].copy v[Temp15], 18
							// "WP XY"
							v[0] = v[Temp15..Temp15 + 1] = [rnd(-36000, 36000), v[Kill_pointer + 4711] * -12000 + rnd(-50000, -20000)]
							v[Temp15 + 2] = rnd(-4, 4) * 2250
							v[Temp15 + 3] = rnd(2, 5) * -450
							@if (TT1 & 4096) > 0 {
									@if (TT1 & 8192) > 0 {
								v[Temp15 + 6] = -1350000
								
									} .else bl {
								v[Temp15 + 6] = 450000
								
									}
									v[Temp15 + 7] = rnd(10000, 50000)
									
							} .else bl {
									@if (TT1 & 8192) > 0 {
								v[Temp15 + 6] = 1350000
								
									} .else bl {
								v[Temp15 + 6] = -450000
								
									}
									v[Temp15 + 7] = rnd(-50000, -10000)
									
							}

							v[Temp15 + 6] += rnd(-180000, 180000)
							v[Temp15 + 5] = rnd(14, 18)
							@if v[v[826]] & 16777216 {
									v[Temp15 + 5] += rnd(3, 5)
									
							}
							// "Sh XY"
							Temp15 = Temp14 + 269
							v[0] = v[Temp15..Temp15 + 1] = [rnd(-28000, 28000), v[Kill_pointer + 4711] * -9500 + rnd(-13000, 0)]
							v[Temp15 + 2] = rnd(-3, 3) * rnd(1900, 2250)
							v[Temp15 + 3] = rnd(0, 2) * -250
							v[Temp15 + 5] = rnd(11, 14)
							@if v[v[826]] & 16777216 {
									v[Temp15 + 5] += rnd(3, 5)
									
							}
							v[Temp15 + 6] = TT2 = rnd(120000, 350000) * [-1, 1][rnd(0, 1)]
							@if TT2 >= 0 {
									v[Temp15 + 7] = rnd(30000, 50000)
									
							} .else bl {
									v[Temp15 + 7] = rnd(-50000, -30000)
									
							}
							v[Temp15 + 7] = rnd(-60000, 60000)


							// "###############Helm found"
							@if v[339] >= 1 {
									TT1 = pow(10, v[339])
									v[Kill_pointer + 4999] = victim_PictArray / TT1 / 10 * TT1 + victim_PictArray % TT1
									
							}
							
						}
						@if victim_AgentType == -4 {
							// "Weapons fall"
							Temp15 = Temp14 + 261
							v[1301].copy v[Temp15], 19
							// "WP XY"
							v[0] = v[Temp15..Temp15 + 1] = [rnd(-36000, 36000), v[Kill_pointer + 4711] * -12000 + rnd(-15000, 0)]
							v[Temp15 + 2] = rnd(-4, 4) * 2250
							v[Temp15 + 3] = rnd(1, 4) * -300
							v[Temp15 + 6] = rnd(450000, 800000) * [-1, 1][rnd(0, 1)]
							v[Temp15 + 6] += rnd(-180000, 180000)
							v[Temp15 + 7] = rnd(-50000, 50000)
							v[Temp15 + 5] = rnd(14, 19)
							// "Sh XY"
							Temp15 = Temp14 + 269
							v[0] = v[Temp15..Temp15 + 1] = [rnd(-28000, 28000), v[Kill_pointer + 4711] * -9500 + rnd(-13000, 0)]
							v[Temp15 + 2] = rnd(-3, 3) * rnd(1900, 2250)
							v[Temp15 + 3] = rnd(0, 2) * 250
							v[Temp15 + 5] = rnd(11, 14)
							v[Temp15 + 6] = rnd(-1800000, 1800000)
							v[Temp15 + 7] = rnd(-60000, 60000)
							
						}
						@if s[117] .isOn() {
							@call .cev 84
					
						}
						@if s[319] .isOn() {

							// check who's Tater
							TT1 = Ptr19 * 300
							TT1 += 4801

							// "Bogatyr"
							@if v[TT1] == TRP_rurik_bogatyr {
									@if victim_Culture_Icon == FAC_sushi {
										// "＃＃＃＃＃＃＃＃＃＃＃＃"
										v[229] = 29
										s[240].on
										// "＃＃＃＃＃＃＃＃＃＃＃＃"
								
									}
									
							}

							@if v[TT1] == TRP_rurik_frotri {
									// "＃＃＃＃＃＃＃＃＃＃＃＃"
									v[229] = 30
									s[240].on
									// "＃＃＃＃＃＃＃＃＃＃＃＃"
									
							}

							@if v[190] == 4 {
									@if victim_UnitID == TRP_sushi_fox {
										// "＃＃＃＃＃＃＃＃＃＃＃＃"
										v[229] = 22
										s[240].on
										// "＃＃＃＃＃＃＃＃＃＃＃＃"
								
									}
									
							}
							
						}
						
				}
				
	    }
	    
	}
}`
const fs = require('fs');


// Regular expression to match sentences within square brackets
const regex = /\[(.*?)\]/g;

// Find all matches and display them on the console
const matches = stringdayo.match(regex);

if (matches) {
  // Create an array to store the extracted sentences
  const extractedSentences = [];

  matches.forEach((match) => {
    // Remove the square brackets from the match
    const sentence = match.slice(1, -1);
    extractedSentences.push(sentence);
  });

  // Join the extracted sentences into a single string with line breaks
  const sentencesText = extractedSentences.join('\n');

  // Write the extracted sentences to a file
  fs.writeFileSync('extracted_sentences.txt', sentencesText, 'utf-8');

  console.log('Extracted sentences have been written to extracted_sentences.txt');
} else {
  console.log("No sentences within square brackets found in the input string.");
}



